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

Take W1,b1,...,WL,bL and reshape into a big vector P  
Cost function J(W1,b1,...,WL,bL) = J(P)  
Take dW1,db1,...,dWL,dbL and reshape into a big vector dP  
Is dP is the gradient or the slope of the cost function J?  

for each i:  
    dP(approx)[i] = ( J(P1, P2, ..., Pi+e) - J(P1,P2,..., Pi-e) )/ 2e
    approx= dP[i] = derivative J / derivative P[i]  
    if ( dP approx == dP ) ??


 