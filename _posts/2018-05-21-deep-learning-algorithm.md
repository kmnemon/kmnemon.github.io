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

* Gradient descent with momentum, RMSprop, Adam  
![](/assets/images/2018-05-21-deep-learning-algorithm/momentum.png)  
  
On iteration t:  
Compute dW, db on the current mini-batch:  
1.momentum  
VdW = B1 * VdW + (1-B1)dW  
Vdb = B1 * Vdb (1-B1)db  
W = W - a * vdW, b = b - a * Vdb  
  
Hyperparameters: a, B1,   B1 = 0.9 

2.RMSprop  
SdW = B * SdW +(1-B2)dW^2  
Sdb = B * Sdb + (1-B2)db^2  

W = W - a * dW/(square(sdW) + e)  
b = b - a * db/(square(sdb) + e)  

Hyperarameters: a, B, e = 10^-8  

3.Adam  
VdW = B1 * VdW + (1-B1)dW, Vdb = B1 * Vdb + (1-B1)db  
Sdw = B2 * Sdw + (1-B2)dw^2, Sdb = B2 * Sdb + (1-B2)db^2  
VcorrecteddW = Vdw/(1-B1^t), Vcordb = Vdb/(1-B1^t)  
ScordW = Sdw/(1-B2^t), Scordb = Sdb/(1-B2^t)  
W = W - a * VcordW/(square(ScordW) + e)  
b = b - a * Vcordb/(square(Scordb) + e)  
  
Hyper:   
a: needs to be tune  
B1: 0.9  
B2 = 0.999  
e = 10^-8  

* Learning rate decay  
![](/assets/images/2018-05-21-deep-learning-algorithm/learning_rate_decay.png)  
1 epoch = 1 pass through data  
a = (1 / (1 + decay-rate * epoch-num) ) * a0  
  
others:  
a = 0.95 ^epoch-num * a0 - exponentially decay  
a = ( k / square(epoch-num)) * a0 or (k/square(t)) * a0  
a = discrete staircase  


















 