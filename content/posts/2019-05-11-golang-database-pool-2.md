---
title: 用golang实现mongodb数据库连接池-高级篇-协程安全
date: 2019-05-11
---


* 版本  
golang -- 1.12.4  
mongodb -- 4.0  
go driver -- 1.0.0  

* 简介  
  
在上一篇《[用golang实现mongodb数据库连接池-基本篇](/2019/05/10/golang-database-pool.html)》我们实现了mongodb的golang driver按序使用的基本版，但还需要进一步提升效率和高并发安全。本篇张实现高效率协程安全版。  
  
* data race  
  
什么是data race，考虑如下代码：  
```
var balance int
func Deposit(amount int){ balance = balance + amount}
func Balance() int { return balance}

//Alice:
go func(){
	bank.Deposit(200)                // A1
	fmt.Println("=", bank.Balance()) // A2
}()

//Bob
go bank.Deposit(100)                  // B
```

当alice和bob同时执行如上的操作，最后的存款有几种可能性？  
根据直觉会有3种可能：  

alice first | bob first | alice/bob/alice
:-: | :-: | :- 
0 | 0 | 0
A1 200 | B 100 | A1 200
A2 "=200" | A1 300 | B 300
B 300 | A2 "=300" | A2 "=300"  
  
这个结果最后存款都是剩余300似乎也没什么问题，但是这里还有第4种可能，那就是bob的存款操作发生在A1的balance + amount之后，但是在A1的balance =之前，那么会出现什么？  

Data | race  
:-: | :-: | :- 
 | 0 | 
A1r | 0 | ...=balance + amount
B | 100 | 
A1w | 200 | balace = ...
A2 | "=200" | 
  
现在Alice账户剩余200，在data race中100被程序冲掉。  
  
* 设计  
我们使用mutual exclusion的方式进行协程安全设计，具体请参见《[golang实现协程安全的几种方式](/2019/05/13/golang-concurrency.html)》  
  
* 核心代码  
  
```
const(
	MAX_CONNECTION = 10
	INITIAL_CONNECTION = 4
	AVAILABLE = false
	USED = true

)

/*
代码取了一个巧，用实际存放数据库指针的大小ClientPool.size和mongodata.flag来表示上述a，b两个状态
如果mongodata.flag都为USED，那么需要新申请个数据库连接: size++
clientList: the client pool
clientAvailable: the available flag, means the location and available flag in the  client pool
size: the size of allocated client pool <= MAX_CONNECTION
*/
type mongodata struct{
	client *mongo.Client
	pos int
	flag bool

}

type ClientPool struct{
	clientList [MAX_CONNECTION]mongodata
	size int
}

//create a new database connection to the pool
func (cp *ClientPool) allocateCToPool(pos int) (err error){
	cp.clientList[pos].client, err = Dbconnect()
	if err != nil {
		utils.Logger.SetPrefix("WARNING ")
		utils.Logger.Println("allocateCToPool - allocateCToPool failed,position: ", pos, err)
		return err
	}

	cp.clientList[pos].flag = USED
	cp.clientList[pos].pos = pos
	return nil
}

//apply a connection from the pool
func (cp *ClientPool) getCToPool(pos int){
	cp.clientList[pos].flag = USED
}

//free a connection back to the pool
func (cp *ClientPool) putCBackPool(pos int){
	cp.clientList[pos].flag = AVAILABLE
}

//program apply a database connection
func GetClient() (mongoclient *mongodata,  err error) {
	mu.RLock()
	for i:=1; i<cp.size; i++ {
		if cp.clientList[i].flag == AVAILABLE{
			return &cp.clientList[i], nil
		}
	}
	mu.RUnlock()

	mu.Lock()
	defer mu.Unlock()
	if cp.size < MAX_CONNECTION{
		err = cp.allocateCToPool(cp.size)
		if err != nil {
			utils.Logger.SetPrefix("WARNING ")
			utils.Logger.Println("GetClient - DB pooling allocate failed", err)
			return nil, err
		}

		pos := cp.size
		cp.size++
		return &cp.clientList[pos], nil
	} else {
		utils.Logger.SetPrefix("WARNING ")
		utils.Logger.Println("GetClient - DB pooling is fulled")
		return nil, errors.New("DB pooling is fulled")
	}

}

//program release a connection
func ReleaseClient(mongoclient *mongodata){
	mu.Lock()
	cp.putCBackPool(mongoclient.pos)
	mu.Unlock()
}

```

这样我们就完成了一个高效率协程安全的设计，完整代码地址: [https://github.com/kmnemon/golang-mongodb-pool](https://github.com/kmnemon/golang-mongodb-pool)
  
  
  




 