---
title: 程序语言中内存管理-DO NOT STOP THE WORLD
date: 2024-03-26
---
类似枪械有手动步枪-M1903春田，半自动步枪-M1，自动步枪-M16之分，程序语言的内存管理也有手动、半自动和全自动三种方式。手动内存管理的代表语言：C、C++，半自动内存管理的代码语言：Modern C++，Swift，Rust，全自动的代表语言：Java，C#，Go，Python。本文通过不同程序语言来描述三种内存管理方式，以及如何应对循环引用的典型场景。

# 手动内存管理：

为了实现代码的极致效率以及灵活性C和C++语言采用了手动内存管理方式，通过自己编写代码实现堆上的内存分配与回收。
```
//C++代码示例
export class Manual {
public:
  Manual(int s) :elem{ new double[s] }, sz{ s } {}

  ~Manual() {
    delete[] elem;
  }

private:
  double* elem;
  int sz;
};
```

# 半自动内存管理：

内存泄漏是手动内存管理遇到最大的挑战，在复杂的场景下可能出现分配的内存没有释放，导致程序在特殊的情况下内存耗尽停止工作。为了保证内存安全，新一代语言为了不牺牲效率采用编译时期来分析内存的分配与释放，典型的方式是自动引用计数（Automatic Reference Counting ）
```
//swift代码示例
class ARC {
    
}

func usingARC() {
    var ref1: ARC? = ARC()
    var ref2: ARC? = ref1

    ref1 = nil
    ref2 = nil
    //ref1、ref2 已释放
}
```

```
//Modern C++
export class SmartPointers {
public:
  //represents unique ownership (its destructor destroys its object)
  void uniquePtr() {
    std::unique_ptr<X> sp{ new X };
    std::unique_ptr<X> sp3 = std::make_unique<X>();

    std::unique_ptr<X> sp2 = std::move(sp);
  }

  //represents shared ownership (the last shared pointer¡¯s destructor destroys the object)
  void sharedPtr() {
    std::shared_ptr<X> sp = std::make_shared<X>();
    std::shared_ptr<X> sp2 = sp;

    sp.reset();
    sp2.reset();
  }

  //A pointer to an object owned by a shared_ptr
  void weakPtr() {
    std::shared_ptr<X> sharedPtr = std::make_shared<X>();

    // Creating a weak pointer from the shared pointer
    std::weak_ptr<X> weakPtr = sharedPtr;

    // Using the weak pointer to access the object
    if (auto ptr = weakPtr.lock()) {
    }
    else {
      std::cout << "Weak pointer is expired." << std::endl;
    }

    // Resetting the shared pointer
    sharedPtr.reset();

    // Using the weak pointer again after resetting the shared pointer
    if (auto ptr = weakPtr.lock()) {
    }
    else {
      std::cout << "Weak pointer is expired." << std::endl;
    }
  }
};
```

# 全自动内存管理：

同样保证内存安全，同时减少内存管理心智负担，还有一种全自动内存管理-垃圾回收机制（GC）。但这种方式引入了臭名昭著的STOP THE WORLD。
```
//Go代码示例
type Automate struct {
}

func usingGC() {
  a := Automate{}
  fmt.Println(a)
}
```

# 循环引用问题：

两个类的成员相互引用对方，导致内存分配永远无法释放。
```
class A {
    var b: B?
}

class B {
    var a: A?
}

func rc() {
    var ca: A? = A()
    var cb: B? = B()
    ca!.b = cb
    cb!.a = ca
    
    ca = nil
    cb = nil
    //ca、cb并未释放
}
```
该场景其实是半自动内存管理引入的问题，因为手动内存管理不管有没有循环引用只要代码进行delete就会释放内存，而全自动内存管理会自己分析出循环引用在GC的时候释放掉相应的内存。

半自动内存管理这方面加重了程序员的心智负担，需要开发者分析出循环引用场景，并采用弱引用的方式打破循环引用。
```
//通过引入weak弱引用关键字来解决循环引用问题
class Person {
    var apartment: Apartment?
    deinit { print("Person deinit") }
}

class Apartment {
    weak var tenant: Person?
    deinit { print("Apartment deinit") }
}

func weakReference() {
    var tom: Person? = Person()
    var apartment: Apartment? = Apartment()
    
    tom?.apartment = apartment
    apartment?.tenant = tom
    
    tom = nil
    //Person deinit
    
    apartment = nil
    //Apartment deinit
}
```
    


