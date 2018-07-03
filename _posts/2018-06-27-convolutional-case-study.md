---
title: Convolutional case study
author: ke
layout: post
tags: deep_learning
---

* Classic networks:  
  
LeNet-5  
![](/assets/images/2018-06-27-convolutional-case-study/LeNet-5.png)  
paper: [LeCun et al., 1998. Gradient-based learning applied to document recognition]  

AlexNet  
![](/assets/images/2018-06-27-convolutional-case-study/AlexNet.png)  
[Krizhevsky et al., 2012. ImageNet classification with deep convolutional neural networks]  

VGG-16    
![](/assets/images/2018-06-27-convolutional-case-study/VGG-16.png)  
[Simonyan & Zisserman 2015. Very deep convolutional networks for large-scale image recognigiton]  
  
ResNet(layers 152)  
[He et al., Deep residual networks for image recognition]  
  
Residual block  
![](/assets/images/2018-06-27-convolutional-case-study/Residual_block.png)  
Z[l+1] = W[l+1] * a[l] + b[l+1], a[l+1] = g(Z[l+1]), Z[l+2] = W[l+2] * a[l+1] + b[l+2], a[l+2]=g(Z[l+2])  
Residual block: ......................................................................, a[l+2]=g(Z[l+2]+a[l])  
  
ResNet
![](/assets/images/2018-06-27-convolutional-case-study/Residual_Network.png)  
  
Inception  
  
* Classic networks  
  



  

  




  




