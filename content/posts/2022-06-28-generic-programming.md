---
title: 泛型编程浅入浅出(C++, Java, Go)
date: 2022-07-03
---

今年3月随着Go 1.18版发布，引入了一个重大的语言特性：泛型编程。这个特性在发布前引起了一定的争议。崇尚少即是多的一边认为这个特性不是很必要，应该谨慎引入。另一边则认为这是语言必不可少的特性。最后Go的泛型还是如期而至

泛型编程在其他编程语言也遇到了不同的问题，比如在Java 1.0时是没有引入泛型编程支持，到了Java 1.5的时候引入了泛型，但由于引入时间过晚，有大量的标准库和第三方库无法支持，Java选择了妥协采用间接的类型擦除方式来实现泛型编程，导致泛型的使用复杂度增加，同时场景受限。而C++比较明智，一开始就支持泛型，所以在C++ STL标准库里面大量的算法都是采用泛型实现，整个语言体系中泛型占据了核心位置

学习一个语言的特性可以参考其他语言同样的特性，这样就可以了解这个语言特性实现是否设计合理，是否优雅，存在哪些局限性

语言版本：  
C++11  
Java 11  
Go 1.18  

### 1. 泛型函数  
泛型函数用来支持当一个算法用在多种数据类型上，为了避免重复的定义函数，而用泛型函数来支持  
  
两个数据进行取小操作  
```
//C++
template <class T>
T min(T a, T b){
    return a < b ? a : b;
}

//Java不支持

//Go
func Min[T int|float64](a, b T) T {
  if a < b {
    return a
  } else {
    return b
  }
}
```

### 2. 泛型函数-显示特化
当泛型函数用来支持一个算法用在多种数据类型上，但在某个类型数据上泛型函数的实现不适合该类型，那么我们可以显示特化该类型的实现算法
```
/C++独有
template<> string min<string>(string a, string b){
    return a.size() < b.size() ? a : b;
}
```

### 3.泛型类
泛型类的目的是创建一个集合类型，里面的各种数据类型可以进行相同的操作，泛型类避免了多个数据类型的重复定义

```
//C++
template<class T>
class Queue{
public:
  Queue();
  ~Queue();
  T& remove();
  void add( const T&);
  bool isEmpty();
}

//Java
public class Queue<T> {
    public Queue(){
    }
    public T remove(){
        //...
    }
    public void add(final T a){
        //...
    }
}

//Go
type Queue[T interface{}] struct{
    element []T
}
func (q *Queue[T]) remove() *T{
    //...
func (q *Queue[T]) add(a *T){
    //...
}
```

### 类型擦除
前面说到Java是在1.5版本时才引入泛型支持，这个时候已经有大量的工程，类库基于非泛型代码，这个时候引入泛型就会相当复杂，因为不能导致历史代码不兼容。

这时Java做出了妥协，采用类型擦除的方式实现了泛型，并保持历史代码的兼容性。采用这种方式有一个明显的缺陷是在泛型代码内部，无法获取有关任何泛型参数的信息

当在代码尝试调用泛型特有的信息时，Java的实现就会变得复杂
```
//C++
template<class T> 
class Manipulator {
    T obj;
public:
    Manipulator(T x) { obj = x; }
    void manipulate() { obj.f(); }//compiler check
};

class HasF {
public:
    void f() { cout << "HasF::f()" << endl; }
};
```
上面代码调用泛型T的f()方法，在C++的实现中编译器会检查泛型T是否含有f()方法，如果有则编译通过。

在Java中由于类型被擦除，在编译时刻，编译器无法检查是否含有f()方法，这个调用会编译报错。
```

class Manipulator<T> {
    private T obj;
    
    Manipulator(T x) {
        obj = x;
    }
    
    // Error: cannot find symbol: method f():
    public void manipulate() {
        obj.f();
    }
}
```
为了解决这个问题Java在泛型支持中引入新关键字extends，表示该泛型T是后续类型或其子类
```
public class Manipulator2<T extends HasF> {
    private T obj;

    Manipulator2(T x) {
        obj = x;
    }

    public void manipulate() {
        obj.f();
    }
}
```

这样引入复杂度才解决这个问题。

为了缓解类型擦除带来的问题，Java同时还引入通配符?, 逆变super等关键字支持泛型，可见开始语言特性设计考虑不慎，后续就会引入大量不必要的复杂性

在Go的泛型实现中，就算指定了类型限制，编译器也无法检查调用类型，这方面Go的泛型限制更大，下面代码编译不过
```
type Manipulator[T HasF] struct{
    obj T
}
func (m Manipulator[T]) manipulate(){
    m.obj.f() //compile error: undefined
}
type HasF struct{
}
func (h HasF) f(){
}
```

### 泛型类特化与偏特化

C++同时还支持泛型类的特化与偏特化能力，这些都是Java与Go泛型不支持的特性，这里就不举例了


### 4.泛型方法

当类中少数方法需要泛化，并不需要全面泛化类时，泛型方法就登场了
```
//C++
class Queue{
public:
   template<class Iter>
      void assign(Iter first, Iter last){
      //...
      }
}

//Java
public class Queue {
   public <Iter> void assign(Iter first, Iter last){
       //...
   }
}

//Go不支持泛型方法
```


### 5.泛型接口
当设计接口支持多种数据类型时，就会用到泛型接口
```
//C++
template class<T>
class MinMax{
public:
  virtual T max()=0；
};

//Java
interface MinMax<T extends Comparable<T>> {
  T max();
}
class MyClass<T extends Comparable<T>> implements MinMax<T> {
  public T max() {
    //...
  }
}

//Go
type MinMax[T any] interface{
  max() T
}
```
  
  
这篇文章介绍了主要的泛型场景，我们看到三种语言泛型能力C++>Java>Go，C++从语言开始设计就考虑泛型没有历史包袱，所以泛型能力最强，表达力最优秀。Java借鉴了C++语言，但在泛型设计上慢了一步后期加入泛型只有采用妥协方式（类型擦除）来实现，在泛型支持场景上受限，同时复杂度增加。Go语言受到原作者的影响，一开始并不想支持泛型，在后期社区反馈中才考虑加入泛型，也作出妥协，增加了复杂度，场景也受限更多。  
  
    
  


