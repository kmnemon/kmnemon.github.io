---
title: 代码抽象性与依赖性
date: 2021-08-10
---

我们常说代码除了满足功能需求以外，还应该满足以后的可读性，可测性，可扩展性，可维护性等。我们常常看到两种类型的团队，一类团队软件开发流程里面只有开发+测试，常常处于加班状态，不断的赶新功能上线。另一类团队有完善的软件开发过程，迭代开发，同行评审，单元测试，自动化测试等。主观觉得第二类团队的代码质量应该比较高，可我们对这两类团队的代码到底怎么样，除了一般常用的sonar，findbugs等静态扫描工具的数据，就没太多的了解。除非深入学习业务逻辑，并剖析源代码。

代码的抽象性，决定了代码以后是否容易扩展，抽象性高的代码易于通过继承的方式进行扩展，抽象性低的代码更容易出现复制-粘贴的扩展方式。代码被别的类依赖多，导致代码不容易变化，反之代码可变性就很高。如果从这两个方面考虑代码的设计，就提供了更多的维度了解团队代码的健康度。

我们以模块为基本单位，统计整个系统每个模块的抽象性和依赖性:  
**代码抽象性**  
Nc:模块内类的数量
Na:模块内抽象类和接口的数量
A：代码抽象性 A = Na / Nc
那么这个值的区间是[0,1]
  
**代码依赖易变性**  
Fan-in:进入的依赖。模块外有多少个类依赖于该模块内部类。
Fan-out:出去的依赖。模块内有多少个类依赖于模块外部的类。
代码依赖易变性： I = Fan-out/(Fan-in + Fan-out)
值区间[0,1]

举个例子:
![](/images/2021-08-10-programming-dependency/class_instability.png)
上图Fan-in=3, Fan-out=1
模块依赖性 I=1/(3+1)

如果我们把代码抽象性和依赖性放入到二维坐标轴，x坐标是代码依赖易变性，Y坐标是代码的抽象性。然后在图里面最高抽象性（左上角）到最高抽象易变性（右下角）划一条对角线，这条线叫主道线。
![](/images/2021-08-10-programming-dependency/code_coordinate.png)

我们在上图可以看到三个区域1.痛苦区 2.无用区 3.主道线区
处在痛苦区的模块里面类的抽象性不足，同时极度的稳定，依赖易变性低。这种模块可扩展性不足因为抽象性低，同时被多个模块依赖，不能轻易改变。如果要扩展这个模块的功能，就会产生大量的复制-粘贴重复代码。有一个例外就是基础工具模块，这类模块的特征就是处于极度稳定，并不需要抽象性，所以这类工具模块处于这个区间是合理的。

处在无用区的模块里面类的抽象性很高，但没有类去使用所以依赖易变性也很高。这个区间的模块包含大量的抽象类和接口，但没有外部模块使用它，所以变成了无用的模块。

结论是我们期望一个系统大部分的模块都处于主道线区，不要偏离主道线太远。如果一个模块的二维坐标到主道线的距离过远比如达到0.5，那么这个模块值得打开深入分析里面的类的抽象性与依赖性是否合理。

这里我写了一个工具可以分析java代码的抽象性与依赖性供参考：
[GitHub](https://github.com/kmnemon/codeAnalysis.git)
