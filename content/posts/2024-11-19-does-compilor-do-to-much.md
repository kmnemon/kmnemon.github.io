---
title: 编译器是否帮我们做的过多？
date: 2024-11-19
---
近段时间编程语言开始往安全方面进行发展，类型安全，内存安全，并发安全等，如新兴的Rust语言，Swift 6.0都在安全性上发力，并都在编译器方面下功夫，添加了诸多规则，当你和编译器战斗通过后，理论上你的代码具备某种程度的安全性。

这类安全性同时也影响着语言的发展，比如在面向接口编程中Swift语言里面对于接口还增加了some和any两个关键字，一时让我疑惑不解，其他语言没有这类概念为啥这个语言需要，他想要解决了什么问题？然后又引入两个类型概念Opaque Types和Boxed Protocol Types。

官方文档描述如下：


*"You can think of an opaque type like being the reverse of a generic type. ... An opaque type lets the function implementation pick the type for the value it returns in a way that’s abstracted away from the code that calls the function. ... An opaque type refers to one specific type, although the caller of the function isn’t able to see which type"*

看的云里雾里不知道要干嘛，这些描述不是就是接口要达到的效果吗，让模块外调用者不用知道模块内部细节类型，通过接口抽象进行调用。经过一番探索发现其实Opaque Types是让编译器增加了一层保护机制，由编译器进行检查让返回的接口类型保持底层类型的一致性。这样说还是太抽象举个例子就明白了。

```
protocol Fighter: Equatable {}
struct XWing: Fighter {}
struct YWing: Fighter {}

func lanchXFighter() -> some Fighter {return XWing()}
func lanchYFighter() -> some Fighter {return YWing()}

func compareFighter() {    
  let x = lanchXFighter()    
  let x2 = lanchXFighter()    
  let y = lanchYFighter()   

  if x == x2 {       
   print("x == y") {

   }

  //do not compile  
  if x == y {
  }
}
```

这里我们写两个方法通过接口返回这两个不同的类型，因为这两个类型实现的同样的接口Fighter。compareFighter方法想通过接口类型去比较前两个方法返回的类型是否一致。
在lanchXFighter返回增加了some关键字表示返回的是Opaque类型，因此编译器会记录实际的底层类型用于检查。
在compareFighter通过返回的接口类型比较的时候，如果接口的底层类型不一致，那么在编译阶段就会不通过，比如上面代码想比较“x == y”，因为x的底层类型是XWing，y的底层类型是YWing。所以在编译时期进行检查不通过。
这个就是some关键字和Opaque带来的编译时期的安全性。

那么其他语言是怎么设计的呢？比如简洁的Go语言没有这个关键字。同样的代码如下：
```
func lanchXFighter() Fighter {  
  return XWing{}
}
func lanchYFighter() Fighter {  
  return YWing{}
}

func compareFighter() {  
  x := lanchXFighter()  
  x1 := lanchXFighter()  
  y := lanchYFighter()

  if x == x1 {    
    fmt.Println("x == x1")  
  }

  if x == y {    
    fmt.Println("x == y")  
    }
}
```
Go语言设计并没提供编译时期底层类型的检查，编译直接通过，在运行期如果类型不一致比较直接返回不一致。

个人不喜欢编译时期检查过多，原本思路很清晰的代码，结果编译还报错，你还要花时间费劲和编译器斗争，最后编译通过，证明了你的代码是安全的。同时为了帮助编译器检查增加过多的关键字，也增加了程序员认知负担。作为程序员应该具备写清晰代码的能力，自己去保证比如底层类型的一致性等问题，这样才能写出更加流畅清晰的代码逻辑。







