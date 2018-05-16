---
title: improve your deep learning neuro hyper-parameter
author: ke
layout: post
tags: deep_learning
---

<h2>Initialization</h2>


<h2>Regularization or Dropout</h2>


<h2>Gradient Checking</h2>
The goal of gradient checking is compare derivative cost function to the approximate of derivate cost function  

Take W1,b1,...,WL,bL and reshape into a big vector theta  
Cost function J(W1,b1,...,WL,bL) = J(theta)  
Take dW1,db1,...,dWL,dbL and reshape into a big vector dtheta  
Is dP is the gradient or the slope of the cost function J?  

```
for each i:  
    dtheta(approx)[i] = ( J(theta1, theta2, ..., thetai+e) - J(theta1,theta2,..., thetai-e) )/ 2e  
    (approx dtheta[i] = derivative J / derivative theta[i])  

So for all  
 dtheta_approx =  (J(theta+e) - J(theta - e)) / (2 * e)  
 dtheta = backward_propagation()  

 diff :  
 numerator = np.linalg.norm(dtheta - dtheta_approx)  
 denominator =np.linalg.norm(dtheta) + np.linalg.norm(dtheta_approx)  
 difference = numerator/denominator  

if difference > 1e-7:  
    print(  
        "\033[93m" + "There is a mistake in the backward propagation! difference = " + str(difference) + "\033[0m")  
else:  
    print(  
        "\033[92m" + "Your backward propagation works perfectly fine! difference = " + str(difference) + "\033[0m")  

```
 code example:   
      github: deepl->improve_your_deep_learning_neuro_hyper_parameter_course21  