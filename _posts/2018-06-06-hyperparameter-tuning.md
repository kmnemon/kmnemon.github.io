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
![](/assets/images/2018-06-06-hyperparameter-tuning/caviar.png)  

* Batch Normalization  

normalizing the input features:  
u = 1/m * E x(i)  
X = X - u  
  
variances^2 = 1/m * E x(i)^2  
X = X / variances^2  

Batch Norm:  
give the intermediate values in neuro net: Z(1), ..., Z(m)  
u = 1/m * E Z(i)  
variances^2 = 1/m * E (Z(i) - u)^2  
Z(i)norm = (Z(i) - u) / sqrt(variances^2 + e)  
Ztilde(i) = gamma * Z(i)norm + beta (gamma, beta learnable paramerters)  
  
* Softmax regression  
![](/assets/images/2018-06-06-hyperparameter-tuning/softmax_layer.png)  
Z[L] = W[L]a[L-1] + b[L]  
  
Activation function:  
t = e ^ Z[L]
a[L] = yhat = ( e ^ Z[L] ) / E(j=1~4) ti,  ai[L] = ti / E(j=1~4) ti  
example:  
![](/assets/images/2018-06-06-hyperparameter-tuning/softmax_example.png)  
  
Loss function:  
L(y, yhat) = - E(j=1~4) y(j) * log yhat(j)  
example:  
y = [[0], [1], [0], [0]]; a[L] = yhat = [[0.3], [0.2], [0.1], [0.4]]  
L = -y(2) * log yhat(2) = - log yhat(2), make yhat(2) as big as possible  

Cost function:  
J(w[1], b[1],...) = 1/m E(i=1~m) L(y(i, yhat(i))  





  


   













 