---
title: SwiftUI @State、@Observable、@Binding、@Bindable实现原理
date: 2024-11-29
---

# @State

### 用途
struct
1.私有的View State，使用当前View维护状态生命周期
2.保持struct不可变性的同时修改内部变量值

class
1.私有的View State，使用当前View维护状态生命周期

### 使用方式
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

### 内部实现
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

### 用途
1.给Object增加Observable marker protocol
2.追踪Object's properties的读和写

### 使用方式
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

### 内部实现
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

//展开access和withMutatio
@Observable final class Model {
    //…
    @ObservationIgnored private let _$observationRegistrar = ObservationRegistrar()
    internal nonisolated func access<Member>(keyPath: KeyPath<Model , Member>) {
        _$observationRegistrar.access(self, keyPath: keyPath)
    }
    internal nonisolated func withMutation<Member, T>(
        keyPath: KeyPath<Model , Member>,
        _ mutation: () throws -> T
    ) rethrows -> T {
        try _$observationRegistrar.withMutation(of: self, keyPath: keyPath, mutation)
    }
}
```
access和withMutation两个方法会被observationRegistrar调用. registrar负责保持observers订阅的properties，并通知observers这些properties的变化.
SwiftUI有个withObservationTracking(_ apply:onChange:)全局函数. 其中apply闭包会立即执行，帮助observation订阅对象. onChange闭包是observer，当observable properties变化时被调用.

apply调用后，object的accessd properties和observer闭包，建立关联性.

类似如下：
```
withObservationTracking {
    view.body
} onChange: {
    view.needsUpdate()
}
```
上述代码表示任何view.body内的observable property都通过object's observation registrar注册.并将property和当前view.body形成关联关系.

# @Binding

### 用途
1.确保app的状态一致性，每个状态都有一个单一源(source of truth)
2.property从外面传递进来

### 使用方式
```
struct Counter: View {
    @Binding var value: Int
    var body: some View {
        Button("Increment: \(value)") { value += 1 }
    }
}

struct ContentView: View {
    @State private var value = 0
    var body: some View {
        Counter(value: $value)
    }
}
```

### 内部实现
```
//1.简单实现
struct Counter: View {
    var value: Int
    var setValue: (Int) -> ()
    var body: some View {
        Button("Increment: \(value)") { setValue(value + 1) }
    }
}

struct ContentView: View {
    @State private var value = 0
    var body: some View {
        Counter(value: value, setValue: { value = $0 })
    }
}

//2.使用Binding类型
struct Counter: View {
    var value: Binding<Int>
    var body: some View {
        Button("Increment: \(value.wrappedValue)") {
            value.wrappedValue += 1
        }
    }
}

//使用computed value 简化使用，避免直接调用wrappedValue
struct Counter: View {
    var _value: Binding<Int>
    var value: Int {
        get { _value.wrappedValue }
        set { _value.wrappedValue = newValue }
    }
    init(value: Binding<Int>) {
        self._value = value
    }
    var body: some View {
        Button("Increment: \(value)") { value += 1 }
    }
}

struct ContentView: View {
    @State private var value = 0
    var body: some View {
        Counter(value: Binding(get: { value }, set: { value = $0 }))
    }
}

```
在ContentView里面set:把 $0和@State private property value关联起来，当Counter里面使用$0改变value值，会导致Counter view被重新构建
前面使用$value,是取用@State property的projectedValue($是取用property wrapper's projectedValue的语法糖), 该projectedValue实现Binding(get: { value }, set: { value = $0 }),实现如下:
```
struct ContentView: View {
    private var _value = State(initialValue: 0)
    private var value: Int {
        get { _value.wrappedValue }
        set { _value.wrappedValue = newValue }
    }
    var body: some View {
        Counter(value: _value.projectedValue)
    }
}
```

# @Bindable

### 用途
1.解决Observable Object没有使用@State warpper,因此没有projectedValue,无法使用$value进行唯一源绑定,如下示例使用Bindable可以直接传递model对象进Counter
2.@Binable 构建了projectedValue, 如下例可以在Counter里面使用 $语法糖进行object property的绑定


### 使用方式
1.使用property wrapper
```
@Observable final class Model {
    var value = 0
    static let shared = Model()
}

struct Counter: View {
    @Bindable var model: Model
    var body: some View {
        Stepper("\(model.value)", value: $model.value)
    }
}

struct ContentView: View {
    var model = Model.shared
    var body: some View {
        Counter(model: model)
    }
}
```

2.使用inline方式
```
struct ContentView: View {
    var model = Model.shared
    var body: some View {
        Stepper("\(model.value)", value: Bindable(model).value)
    }
}

```
不使用Counter View,直接使用Bindable(model).value建立联接

### 内部实现
```
struct Counter: View {
    var _model: Bindable<Model>
    var model: Model { _model.wrappedValue }
    
    init(model: Model) {
        _model = Bindable(wrappedValue: model)
    }
    var body: some View {
        Stepper("\(model.value)", value: _model.projectedValue[dynamicMember: \.value])
    }
}
```
使用动态成员查找语法projectedValue[dynamicMember: \.value],查找需要修改的object property




