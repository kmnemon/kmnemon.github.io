---
title: golang-NSQ讲明白
date: 2019-06-24
---


# 版本  
golang -- 1.12.4   
nsq-1.1.0.linux-amd64.go1.10.3.tar.gz  
  
# 什么是NSQ  
  
一句话讲NSQ是一个简单队列，类似于java经常使用的activeMQ或者RocketMQ,一般在同步分离成异步，发送消息和接受消息解耦的地方使用到。  
NSQ有以下特性:  
  - 支持拓扑的高可用性和避免单点故障(SPOFs)。
  - 更强的消息递交保证  
  - 为单次处理绑定着内存的足迹(通过把一些持久话的消息放入磁盘)  
  - 对生产者和消费者的配置进行极大的简化  
  - 提供直接的升级路径  
  - 提升效率  
  
# NSQ组成  
  
NSQ由三个组件组成:  
  - nsqd 用于接收消息，排队消息，投递消息，我们的客户端(生产者，消费者)主要和它打交道  
  - nsqlookupd 管理nsqd,nsqadmin拓扑信息。 我们的客户端(消费者)询问此组件来发现nsqd等  
  - nsqadmin web UI 查询各种NSQ组件的信息，消息信息  
  
# NSQ使用步骤  
  
1. 启动nsqlookupd组件  
2. 启动nsqd并向nsqlookupd注册  
3. 启动nsqadmin并向nsqlookupd注册  
4. 生产者推送一个message到其中一个nsqd，并将此消息设置到一个topic里面  
5. 消费者向nsqlookupd询问指定topic的消息，nsqlookupd把有此topic的nsqd地址给到消费者  
6. 消费者建立channel和topic之间的订阅关系，通过channel向nsqd获取指定topic里面的消息  
7. nsqd向所有订阅该topic的channel推送message， 然后其中一个消费者可以通过其中一个channel获取该topic的message  
  
注意第4点，生产者为什么没有从nsqlookupd注册中心去寻找可以推送消息的nsqd呢？因为nsq的设计理念是将nsqd本地化，也就是说生产者直接推送消息到local-nsqd。这点和RocketMQ的设计理念不一样，RocketMQ的NameServer和nsqlookupd类似，但是设计上RocketMQ生产者会访问NameServer去寻找可用的MQ推送消息。  
  
### 启动，注册过程:  
![](/assets/images/2019-06-24-golang-nsq-intro/startup.png)  

### 生产者，消费者:  
![](/assets/images/2019-06-24-golang-nsq-intro/producer_consumer.png)  

这就是nsq一个完整的使用流程，下面分别从客户端和代码两个方面介绍详细怎么使用  

# 客户端使用  
启动nsqlookup 

```
$ nsqlookupd

```

在另一个shell启动一个nsqd,并在lookupd注册,注意-broadcast-address一定是消费者可以访问的地址  

```
$ nsqd --lookupd-tcp-address=127.0.0.1:4160 -broadcast-address="x.x.x.x"  -tcp-address="0.0.0.0:4150"
```
启动nsqadmin，并在lookupd注册:  

```
$ nsqadmin --lookupd-http-address=127.0.0.1:4161
```
生产者生产一个message，并创建该消息的topic  

```
$ curl -d 'hello world 1' 'http://127.0.0.1:4151/pub?topic=test'
```
消费者通过lookupd查找对应的topic的nsq并绑定topic和channel，通过channel接受该topic的message 

```
$ nsq_to_file --topic=test --output-dir=/tmp --lookupd-http-address=127.0.0.1:4161
```
生产者生产更多消息  

```
$ curl -d 'hello world 2' 'http://127.0.0.1:4151/pub?topic=test'
$ curl -d 'hello world 3' 'http://127.0.0.1:4151/pub?topic=test'
```
可以打开nsaadmin查看所有详情http://127.0.0.1:4171/ ，同时也可以查看/tmp下面接收并写入的message (test.*.log)  

  
# 代码  
生产者代码:  

```
package main

import (
  "github.com/nsqio/go-nsq"
  "log"
)


func main() {
  config := nsq.NewConfig()
  w, _ := nsq.NewProducer("x.x.x.x:4150", config)

  err := w.Publish("write_test", []byte("test"))
  if err != nil {
    log.Panic("Could not connect")
  }

  w.Stop()
}
```
消费者代码：  

```
package main

import (
  "fmt"
  "github.com/nsqio/go-nsq"
  "log"
  "sync"
)

func main() {

  wg := &sync.WaitGroup{}
  wg.Add(1)

  config := nsq.NewConfig()
  q, _ := nsq.NewConsumer("write_test", "ch", config)
  q.AddHandler(nsq.HandlerFunc(func(message *nsq.Message) error {
    fmt.Println(string(message.Body))
    wg.Done()
    return nil
  }))
  err := q.ConnectToNSQLookupd("x.x.x.x:4161")
  if err != nil {
    log.Panic("Could not connect")
  }
  wg.Wait()

}
```
  

