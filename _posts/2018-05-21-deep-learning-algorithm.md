---
title: deep learning algorithm
author: ke
layout: post
tags: deep_learning
---

* Mini-batch gradient descent  

Batch gradient descent VS Mini-batch gradient descent:  
Total traning examples 10000  
if you use m = 10000 for one iteration, this is Batch gradient.  
if you use m = 1 for one iteration, this is stochastic gradient descent.  
if you use m = 64, 128, 256, 512 for one iteration, this is mini-batch.  
![](/assets/images/2018-05-21-deep-learning-algorithm/batch.png)
![](/assets/images/2018-05-21-deep-learning-algorithm/mini-batch.png)
![](/assets/images/2018-05-21-deep-learning-algorithm/three-batch.png)  
Batch gradient.(total traning exampls <2000)  
make sure mini-batch fit in CPU/GPU memery   







 