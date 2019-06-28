---
title: golang-NSQ讲明白
author: ke
layout: post
tags: golang
---


* 1.版本  
golang -- 1.12.4   
nsq-1.1.0.linux-amd64.go1.10.3.tar.gz  
  
* 2.什么是NSQ  
  
一句话讲NSQ是一个简单队列，类似于java经常使用的activeMQ或者RocketMQ,NSQ有以下特性:  
  - 支持拓扑的高可用性和避免单点故障(SPOFs)。
  - 更强的消息递交保证  
  - 为单次处理绑定着内存的足迹(通过把一些持久话的消息放入磁盘)  
  - 对生产者和消费者的配置进行极大的简化  
  - 提供直接的升级路径  
  - 提升效率  
  
* 3.NSQ组成  
  
NSQ由三个组件组成:  
  - nsqd 用于接收消息，排队消息，投递消息，我们的客户端(生产者，消费者)主要和它打交道  
  - nsqlookupd 管理nsqd,nsqadmin拓扑信息。 我们的客户端询问此组件来发现nsqd等  
  - nsqadmin web UI 查询各种NSQ组件的信息，消息信息  
  
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




 