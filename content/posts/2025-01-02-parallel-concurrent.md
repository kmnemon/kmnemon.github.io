---
title: 现代语言怎么支持Parallel和Concurrent
date: 2025-01-02
---

# Parallel和Concurrent
我们先来回顾一下概念:
Parallel是指同时执行多个任务或计算.通常在多核或多处理器的硬件上并行执行多个操作,每个操作独立运行,并且是同步的(并行的任务在同一时刻发生).并行计算的目标是通过同时使用多个计算资源来加速程序的执行.

Concurrent是指系统在同一时间段内处理多个任务的能力.并发并不意味着任务是同时执行的,而是任务在某一时刻轮流执行.


举个例子就更容易理解：
你有一个奶茶店,制作奶茶需要三个步骤,分别是收银,调制奶茶配料和用设备制作奶茶.假设现在有两个角色,A负责收银,B负责调制奶茶配料和用设备制作奶茶.整个步骤是A->B.作为店主你很快发现A收银很快,B调制配料和制作奶茶很慢造成了瓶颈,这是你选择解决方案是再雇佣了另外一个人和B一起负责调制奶茶配料和用设备制作奶茶,现在整个步骤是A->B1 or B2.在这个场景中增加B2就是我们说的Parallel.当然你还可以用另一个方案解决,把原步骤调制奶茶配料和用设备制作奶茶拆分为两个步骤,分别让B负责调制奶茶配料,再雇佣一个人去负责用设备制作奶茶,步骤变为A->B->C,在这个场景中增加C就是增加了Concurrent.


# 现代语言的并发模型
现代语言支持并发模型一般会在操作系统线程和应用程序之间增加一层,在这层中使用预先分配的线程池和调度器来实现应用程序的并发能力.如在Go语言中称为协程(Coroutine).
Go语言的并发模型如下:
![](/images/2025-01-02-parallel-concurrent/go-concurrency-model.png)
- G—Goroutine
- M—OS thread (stands for machine)
- P—CPU core (stands for processor)

默认情况每一个CPU核心(P)里面会有一个线程(M),每个线程会不断切换去运行协程(G).

Swift语言的并发模型,同样也是在操作系统线程和应用程序之间增加了一层.稍有不同的是他通过把代码划分为逻辑单元称为局部任务(Partial Tasks),通过调度器把局部任务分配到线程池不同的线程运行来实现并发能力.
![](/images/2025-01-02-parallel-concurrent/partialtask.png)


# 现代语言中支持并发的语言特性
那么在这些语言中怎么支持并发的呢？这里我们举例三个场景:

### 场景1: 增加Parallel,就是我们前面说的第一个方案增加另一个人和B一起负责调制奶茶配料和用设备制作奶茶
Go实现
```
func taskA() int {
    time.Sleep(2 * time.Second)
    return 5
}

func parallelExample() int {
    c := make(chan int)

    go func() {
        c <- taskA()
    }()
    go func() {
        c <- taskA()
    }()

    r1 := <-c
    r2 := <-c

    return r1 + r2
}
```

Swift实现
```
func taskA() async -> Int {
    try! await Task.sleep(for: .seconds(2))
    return 5
}

func parallelExample() async -> Int {
    async let resultA = taskA()
    async let resultB = taskA()
    
    let r1 = await resultA
    let r2 = await resultB
    return r1 + r2
}
```

### 场景2: 增加Concurrent,另一个方案把原步骤拆分为两个步骤由两个人去操作
Go实现
```
func taskA1() int {
    time.Sleep(2 * time.Second)
    return 5
}
func taskB1(a1 int) int {
    time.Sleep(1 * time.Second)
    return a1 + 2
}

func concurrentExample() int {
    c := make(chan int, 3)

    rc := make(chan int)

    go func() {
        for range 5 {
            c <- taskA1()
        }
    }()

    go func() {
        for range 5 {
            r1 := <-c
            rc <- taskB1(r1)
        }
    }()

    result := 0
    for range 5 {
        result += <-rc
    }
    return result
}
```
Swift实现
```
func taskA1() async -> Int {
    try! await Task.sleep(for: .seconds(2))
    return 5
}
func taskB1(a1: Int) async -> Int {
    try! await Task.sleep(for: .seconds(2))
    return a1 + 2
}

func concurrentExample() async -> Int {
    var result = 0
    let taskCount = 5
    
    let taskAStream = AsyncStream<Int> { continuation in
        Task {
            for _ in 0..<taskCount {
                let taskAResult = await taskA1()
                continuation.yield(taskAResult)  // Yield the result as soon as it's ready
            }
            continuation.finish()  // Finish the stream when all taskA1 are done
        }
    }
    
    for await a1 in taskAStream {
        let b1Result = await taskB1(a1: a1)
        result += b1Result
    }
    
    return result
}
```

### 场景3:先Parallel再Concurrent,即增加人去调制奶茶,同时也增加步骤让不同的人分别负责调制奶茶和用设备制作奶茶
Go实现
```
func taskA2() int {
    time.Sleep(2 * time.Second)
    return 5
}
func taskB2(a1 int) int {
    time.Sleep(1 * time.Second)
    return a1 + 2
}

func parallelWithConcurrentExample() int {
    c := make(chan int, 3)

    rc := make(chan int)

    go func() {
        for range 5 {
            c <- taskA1()
        }
    }()

    go func() {
        for range 5 {
            c <- taskA1()
        }
    }()

    go func() {
        for range 10 {
            r1 := <-c
            rc <- taskB1(r1)
        }
    }()

    result := 0
    for range 10 {
        result += <-rc
    }
    return result
}

```

Swift实现
```
func taskA2() async -> Int {
    try! await Task.sleep(for: .seconds(2))
    return 5
}
func taskB2(a1: Int) async -> Int {
    try! await Task.sleep(for: .seconds(2))
    return a1 + 2
}

func parallelWithConcurrentExample() async -> Int {
    var result = 0
    let taskCount = 5
    let streamCount = 2
    
    let taskAStream = AsyncStream<Int> { continuation in
        var c = 0
        Task {
            for _ in 0..<taskCount {
                let taskA2Result = await taskA2()
                continuation.yield(taskA2Result)  // Yield the result as soon as it's ready
            }
            c += 1
            if c == 2 {
                continuation.finish()
            }// Finish the stream when all taskA1 are done
        }
        
        Task {
            for _ in 0..<taskCount {
                let taskA2Result = await taskA2()
                continuation.yield(taskA2Result)  // Yield the result as soon as it's ready
            }
            c += 1
            if c == 2 {
                continuation.finish()  // Finish the stream when all taskA1 are done
            }
        }
    }
    
    for await a1 in taskAStream {
        let b2Result = await taskB2(a1: a1)
        result += b2Result
    }
    
    return result
}
```

这样我们就完成了现代语言怎样支持Parallel和Concurrent的介绍.
