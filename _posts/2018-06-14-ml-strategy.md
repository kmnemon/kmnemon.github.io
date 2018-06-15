---
title: machine learning strategy
author: ke
layout: post
tags: deep_learning
---

* Orthogonalization  
  
Fit training set well on cost function  
bigger network  
Adam  
...  
  
Fit dev set well on cost function  
Regularization  
Bigger trainning set  

Fit test set well on cost function  
Bigger dev set  
  
Performs well in real world  
change dev set  
change cost function  

* Single number evaluation metric  

Classifier, Precision, Recall, F1 Score  
A, 95%, 90%, 92.4%  
B, 98%, 85%, 91.0%  

F1 Score = 2 / ( 1/p + 1/R), "Harmonic mean" )  
use F1 score we can easily find out which is the better classifier(A in this example).  

* Satisficing and optimizing metrics  
  
Classifier, Accuracy, Running time, cpu rate  
A, 90%, 80ms, 40%  
B, 92%, 95ms, 50%  
C, 95%, 1500ms, 90%  
  
we use 2 catagory to measure the better classifier:  
optimizing  metrics - pick the maximize one  
satisficing metrics - N-1 must be meet the threshold  

in the example "Accuracy" is the optimizing metrics and the others(N-1) is the satisficing metrics. we need the accuracy as well as it can be, and the Running time <100ms the cpu rate < 60%, So the best classifier is B.  
  
* train, dev, test set  
  
goal of dev set: helps you evaluate different ideas and pick this up, A or B better.  
goal of test set: to help you evaluate your final cost bias.
dev set, test set need to be in the same distribution.  
  
* When to change dev/test sets and metrics  
  
example:  
Metric: classification error, pick up a cat  
Error: 1/m(dev) E(i=1, m(dev)) L{ypred(i) != y(i)}  
  
Algorithm A: 3% error  
Algorithm B: 5% error  

So the algorithm A is better! But algorithm A sometime pick the pornography send to the user, but B doesn't. So the Error metrics did not fit the situation.  

change the metric:
Error: 1/m(dev) E(i=1, m(dev)) W(i) * L{ypred(i) != y(i)}  
Error2: 1/ew(i) E(i=1, m(dev)) W(i) * L{ypred(i) != y(i)}  
W(i) = { 1, if x(i) is non-porn;  10, if x(i) is porn}  

in this metric B is a better algorithm  

So there is two steps:
1. So far we've only discussed how to define a metric to evaluate classifiers.(plan target)  
define the metric: like 3% error  
2. Worry separately about how to do well on this metric.(shot at target)  
tune the cost function  
  
example2:  
if doing well on your metric + dev/test set does not correspond to doing well on your application, change your metric and/or dev/test sets.    



