---
title: hyperparameter tuning
author: ke
layout: post
tags: deep_learning
---

* Hyperparameters tuning sequence  
1.sequence  
a - 1st  
beta - 2nd  
beta1, beta2, e  -last
#layer - 3rd  
#hidden units - 2nd  
learning rate decay - 3rd  
mini-batch size - 2nd  
  
2.use random values better than grid value  
![](/assets/images/2018-06-06-hyperparameter-tuning/random_values.png)  

3.coarse to fine  
![](/assets/images/2018-06-06-hyperparameter-tuning/coarse_to_fine.png)  
  
* Appropriate scale for hyperparameters  
a = 0.0001 ~ 1  
scale: 0.0001, 0.001, 0.01, 0.1, 1 (log10 0.0001~log10 1)  
  
beta = 0.9.....0.999  
1-beta = 0.1...0.001  
r = [-3, -1]  
1-beta = 10^r  
beta = 1- 10^r  
  
* Pandas VS. Caviar
![](/assets/images/2018-06-06-hyperparameter-tuning/babysitting.png)  
![](/assets/images/2018-06-06-hyperparameter-tuning/random_values.png)  












 