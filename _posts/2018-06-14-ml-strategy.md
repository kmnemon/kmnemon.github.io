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
  


