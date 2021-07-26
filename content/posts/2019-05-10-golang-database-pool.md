---
title: 用golang实现mongodb数据库连接池-基本篇
date: 2019-05-10
---


* 版本  
golang -- 1.12.4  
mongodb -- 4.0  
go driver -- 1.0.0  

* 简介  
  
mongodb的数据库driver在官方文档里面明确写明所有的数据库连接需要自己建立和释放，而且建议尽量复用已有的建立，那么也就是说driver里面并未实现连接池的功能。在我们实际应用中就需要自己实现这套数据库连接池提升程序和数据库之间的执行效率。  
  
* 设计思路  
  
用一个数组来存放数据库连接的指针，并记录每一个指针两个状态: a.是否申请了数据库连接 b.这个连接是否已经给系统在使用中。举个例子就比较好理解了:  
1. 申请一个用于存放数据连接的数组，一开始空的什么都没有  
![](/images/2019-05-10-golang-database-pool/pool_initial.png)  
  
2. 程序需要一个数据库连接，连接池把数组第一个位置建立一个数据库连接，并把这个连接的状态置为：a.已申请 b.已给系统  
![](/images/2019-05-10-golang-database-pool/pool_create_connection.png)  
  
3. 程序使用完释放数据库连接，现在数据库指针状态为：a.已申请 b.未使用  
![](/images/2019-05-10-golang-database-pool/pool_release_connection.png) 
  
4. 程序需要新申请一个数据库连接，那么就回到了第2的状态。  
  
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
	for i:=1; i<cp.size; i++ {
		if cp.clientList[i].flag == AVAILABLE{
			return &cp.clientList[i], nil
		}
	}

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
	cp.putCBackPool(mongoclient.pos)
}

```
以上就是核心代码实现，但是这个代码有一个问题，就是在高并发下并非协程安全，这个留在下一篇《[用golang实现mongodb数据库连接池-高级篇-协程安全](/posts/2019-05-11-golang-database-pool-2/)》来优化。    
  





 