---
title: SwiftUI @State、@Observable、@Binding、@Bindable
date: 2024-11-29
---

# @State

## 用途
struct
1.私有的View State，使用当前View维护状态生命周期
2.保持struct不可变性的同时修改内部变量值

class
1.私有的View State，使用当前View维护状态生命周期

## 使用方式
```
struct Counter: View {
    @State private var value = 0

    var body: some View {
        Button("Increment: \(value)") {
            value += 1
        }
    }
}
```

## 内部实现
```
struct Counter: View {
    private var _value = State(initialValue: 0)
    private var value: Int {
        get { _value.wrappedValue }
        nonmutating set { _value.wrappedValue = newValue }
    }

    var body: some View {
        Button("Increment: \(value)") {
            value += 1
        }
    }
}
```
SwiftUI给value state在render tree里面分配内存并赋予initialValue:0，并建立链接使value指向这个内存值
Counter's body依赖这个内存值，一旦内存值变化会重新构建Counter's body.


# @Observable

## 用途
1.给Object增加Observable marker protocol
2.追踪Object's properties的读和写

## 使用方式
1.使用CounterView管理model生命周期
```
@Observable final class Model {
    var value = 0
}

struct Counter: View {
    @State private var model = Model()
    var body: some View {
        Button("Increment: \(model.value)") {
            model.value += 1
        }
    }
}
```

2.外部传递，由外部对象管理生命周期
```
@Observable final class Model {
    var value = 0
    static let shared = Model()
}

struct Counter: View {
    var model: Model
    var body: some View {
        Button("Increment: \(model.value)") {
            model.value += 1
        }
    }
}

struct ContentView: View {
    var body: some View {
        Counter(model: Model.shared)
    }
}
```

## 内部实现
```
@Observable final class Model {
    var value = 0 {
        get {
            access(keyPath: \.value )
            return _value
        }
        set {
            withMutation(keyPath: \.value ) {
                _value = newValue
            }
        }
    }
    @ObservationIgnored private var _value = 0
    //…
}
```


# @Binding


```
```


# @Bindable


```
```





