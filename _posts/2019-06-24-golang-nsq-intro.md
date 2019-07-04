---
title: golang-NSQ讲明白
author: ke
layout: post
tags: golang
---


1.版本  
golang -- 1.12.4   
nsq-1.1.0.linux-amd64.go1.10.3.tar.gz  
  
2.什么是NSQ  
  
一句话讲NSQ是一个简单队列，类似于java经常使用的activeMQ或者RocketMQ,一般在同步分离成异步，发送消息和接受消息解耦的地方使用到。  
NSQ有以下特性:  
  - 支持拓扑的高可用性和避免单点故障(SPOFs)。
  - 更强的消息递交保证  
  - 为单次处理绑定着内存的足迹(通过把一些持久话的消息放入磁盘)  
  - 对生产者和消费者的配置进行极大的简化  
  - 提供直接的升级路径  
  - 提升效率  
  
3.NSQ组成  
  
NSQ由三个组件组成:  
  - nsqd 用于接收消息，排队消息，投递消息，我们的客户端(生产者，消费者)主要和它打交道  
  - nsqlookupd 管理nsqd,nsqadmin拓扑信息。 我们的客户端(消费者)询问此组件来发现nsqd等  
  - nsqadmin web UI 查询各种NSQ组件的信息，消息信息  
  
4.NSQ使用步骤  
  
1. 启动nsqlookupd组件  
2. 启动nsqd并向nsqlookupd注册  
3. 启动nsqadmin并向nsqlookupd注册  
4. 生产者推送一个message到其中一个nsqd，并将此消息设置到一个topic里面  
5. 消费者向nsqlookupd询问指定topic的消息，nsqlookupd把有此topic的nsqd地址给到消费者  
6. 消费者建立channel和topic之间的订阅关系，通过channel向nsqd获取指定topic里面的消息  
7. nsqd向所有订阅该topic的channel推送message， 然后其中一个消费者可以通过其中一个channel获取该topic的message  
  
启动，注册过程： 
![](/assets/images/2019-06-24-golang-nsq-intro/startup.png)  

生产者，消费者：  
![](/assets/images/2019-06-24-golang-nsq-intro/producer_consumer.png)  

这就是nsq一个完整的使用流程，下面分别从客户端和代码两个方面介绍详细怎么使用  

5.客户端使用  
1. 启动nsqlookup
```
$ nsqlookupd

```

2. 在另一个shell启动一个nsqd,并在lookupd注册

```
$ nsqd --lookupd-tcp-address=127.0.0.1:4160
```
3. 启动nsqadmin，并在lookupd注册:
```
$ nsqadmin --lookupd-http-address=127.0.0.1:4161
```
4. 生产者生产一个message，并创建该消息的topic
```
$ curl -d 'hello world 1' 'http://127.0.0.1:4151/pub?topic=test'
```
5.消费者通过lookupd查找对应的topic的nsq并绑定topic和channel，通过channel接受该topic的message
```
$ nsq_to_file --topic=test --output-dir=/tmp --lookupd-http-address=127.0.0.1:4161
```
6.生产者生产更多消息
```
$ curl -d 'hello world 2' 'http://127.0.0.1:4151/pub?topic=test'
$ curl -d 'hello world 3' 'http://127.0.0.1:4151/pub?topic=test'
```
7.可以打开nsaadmin查看所有详情http://127.0.0.1:4171/ ，同时也可以查看/tmp下面接受并写入的message (test.*.log)


1.channel - monitor goroutine  

```
var deposits = make(chan int) // send amount to deposit
var balances = make(chan int) // receive balance

func Deposit(amount int) { deposits <- amount }
func Balance() int       { return <-balances }

func teller() {
     var balance int // balance is confined to teller goroutine
     for {
         select {
         case amount := <-deposits:
              balance += amount
         case balances <- balance:
         }
      }
}
func init() {
     go teller() // start the monitor goroutine
}
```  
  
2.channel - serial confinement  

```
type Cake struct{ state string }

func baker(cooked chan<- *Cake) {
     for {
             cake := new(Cake)
             cake.state = "cooked"
             cooked <- cake // baker never touches this cake again
         } 
}

func icer(iced chan<- *Cake, cooked <-chan *Cake) {
      for cake := range cooked {
             cake.state = "iced"
             iced <- cake // icer never touches this cake again
      } 
}
```
  
3.mutual exclusion  

```
import "sync"

var mu      sync.Mutex // guards balance
var balance int

func Deposit(amount int) {
         mu.Lock()
         balance = balance + amount
         mu.Unlock()
}

func Balance() int {
         mu.Lock()
         defer mu.Unlock()
         return balance
}
```

4.mutual exclusion - RWMutex  

```
import "sync"

var mu      sync.RWMutex // guards balance
var balance int

func Deposit(amount int) {
         mu.Lock()
         balance = balance + amount
         mu.Unlock()
}

func Balance() int {
         mu.RLock() //readers lock
         defer mu.RUnlock()
         return balance
}
```
RLock允许读取并行，写入和读取完全互斥，多次读取，一次写入  
  
5.Lazy Initialization - sync.Once  

```
var loadIconsOnce sync.Once
var icons map[string]image.Image
// Concurrency-safe.
func Icon(name string) image.Image {
     loadIconsOnce.Do(loadIcons)
     return icons[name]
}

```




 