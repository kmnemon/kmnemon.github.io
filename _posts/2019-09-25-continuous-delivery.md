---
title: 持续交付
author: ke
layout: post
tags: notebook
---


# Glossary  
cycle time - software delivery by making the path from idea to realized business value  



# ppt
Continuous Delivery, which is taken from the first principle of the Agile Manifesto: “Our highest priority is to satisfy the customer through early and continuous delivery of valuable software”


#principle  
1. use the same script to deploy to every environment  
2. To ensure you aren't going to break the applicaiton when you  check in:  
a. run your commit test suite before the check-in
b. introduce incrementally, commit changes to the version contrlo system at the conclusion of each separate incremental change or refactoring.


# 版本  
golang -- 1.12.4   
nsq-1.1.0.linux-amd64.go1.10.3.tar.gz  
  
# Continuous delivery include:  
1. automate deployment
2. deploying to a production-like environment every time
3. configuration management 
  
 
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

# 代码  
生产者代码:  

```
package main


}
```
消费者代码：  

```
package main



}
```
  

