---
title: 理解响应式编程（reactive programming)
date: 2022-03-20
---

过去十年互联网用户数呈指数级增长，各类网络服务访问数量也随之持续增长。为了应对持续增长的访问需求，各种技术被重新赋予了新的活力。微服务，DDD，响应式编程等技术被重新改进用于应对以上问题。本文着重讨论响应式编程背后的原理，帮助读者理解并应用于实际的开发中。  
  
**响应式宣言**  
说到响应式编程首先要引入一个概念响应式系统（Reactvie Systems)。回到2013年Jonas Boner领导的开发团队提出了响应式宣言，其中定义了响应式系统一系列核心原则.主要描述了该系统应具备灵活性，松耦合以及可扩展性.原则描述了响应式系统的基础特性：  
* 可响应性：一个响应式系统应提供快速和一致的响应时间，以及一致的服务质量
* 可复原性：一个响应式系统在随机失败的情况下，通过复制和隔离能力保持响应
* 可伸缩性：一个响应式系统在不可预测的负载下，通过经济的可扩展性保持响应
* 消息驱动：系统组件之间应通过异步消息机制进行通信

  

**响应式编程要解决什么问题**  
在非响应式同步调用的系统中两个服务是怎么调用的呢？假设我们有A，B，2个服务，当服务A调用服务B后（request），服务B开始处理收到的请求，这个时候服务A的线程会被阻塞住（idle），等待服务B处理完成后返回响应给服务A（respond），这时服务A线程被唤起继续处理接下来的逻辑。    
![](/images/2022-03-21-understanding-reactive-programming/reactive-1.png)

这是我们常用的同步调用方式，他最大的问题是会使资源经常处于idle状态，没有充分利用我们的资源，对资源浪费很大。例如服务A调用服务B的线程在调用后就被阻塞住，不能做其他的事情，直到服务B响应为止。我们知道系统的线程要占用CPU周期，内存等硬件资源，并且极其有限。  

那么响应式编程的目标就是解决资源浪费问题，最高效地使用资源。这里我们看到服务A线程调用服务B后，并未等待服务B处理完成，便开始处理其他逻辑，所以服务B的单个线程可以不断调用服务B。那么服务B也可以不间断的收到大量的请求进行处理，这里A，B两个服务都高效的利用了资源。  
![](/images/2022-03-21-understanding-reactive-programming/reactive-2.png)

**响应式编程背后的原理**  
这怎么实现呢？当服务A调用服务B的时候，AB服务之间建立了一个订阅通道，通道建立好以后，服务A线程就去处理其他逻辑，等服务B处理完请求准备好数据后，便会通知服务A数据已经准备好了，这个时候服务A会有一个独立的线程池去获取服务B的数据，这样就实现了同步调用/异步响应的调用方式。  
![](/images/2022-03-21-understanding-reactive-programming/reactive-3.png)

这里有几个响应式编程重要的核心概念：  
* <strong>发布者(The Publisher): </strong>发布者就是数据的生产者，这个是为系统生产数据的组件，这里的服务B就是一个发布者，他收到服务A的请求后就开始生产数据。
* <strong>订阅者(The Subscriber): </strong>订阅者订阅发布者生产的数据。这里服务A就是订阅者，他订阅来自服务B的数据。
* <strong>订阅过程(The Subscription):</strong>订阅过程是一份服务之间的合约（contract)，它被用于订阅者获取数据，或者取消订阅。

* <strong>处理者(The Processor):</strong>处理者是一个响应式实体，他能够消费发布者的数据，并进行再加工，然后发布自己的数据，上面的例子并未体现这层逻辑。举个例子，排序处理者，他可以作为订阅者获取发布者的随机序数据，然后进行排序，然后作为发布者生产出排序后的数据。

**背压机制(Backpressure Mechanism)**  
前面说到响应式编程包含发布者生产数据，订阅者订阅数据，很自然想到当发布者生产数据的速度和订阅者消费数据的速度不匹配的问题，特别是快于订阅者能消费数据的速度，这时系统就是出现问题，订阅者就会被过量的数据淹没。  

![](/images/2022-03-21-understanding-reactive-programming/reactive-4.png)

响应式编程是为了高效的利用系统资源，总不能把系统服务打垮了吧。这时我们在设计系统的时候会引入背压机制来控制发布者和订阅者之间的平衡。  

一般我们通过三种策略来调控速率：  

* 控制发布者发送数据的速率（推荐）
* 订阅者使用缓存来存储暂时无法处理的数据
* 订阅者丢弃所有无法处理的数据

![](/images/2022-03-21-understanding-reactive-programming/reactive-5.png)



为了达到系统的高效运行，通过背压机制，使发布者和订阅者速率达到平衡，也就是根据消费能力来按需生产和发送数据，生产多少，就消费多少，用前面的A，B服务的例子来说明：  

![](/images/2022-03-21-understanding-reactive-programming/reactive-6.png)

服务A给服务B发送一个request请求1个数据，服务B的生产完成1个数据的时候，就通知服务A（onNext）有个数据就绪了,服务A就以同样的速率处理数据，这样服务B生产速率就被服务A限制，A，B两个服务就工作在同样的速率，这样系统效率达到最佳。  

在这里讲完了响应式编程的核心原理，下一篇《使用WebFlux进行响应式编程》会继续深入讨论响应式编程在代码中的实现。  
