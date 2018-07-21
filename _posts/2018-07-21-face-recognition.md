---
title: face recognition
author: ke
layout: post
tags: deep_learning
---

* face recognition  
  
face verification:  
Input image, name/ID  
Output whether the input image is that of the claimed person  
1:1  
  
face recognition:  
Has a database of K persons  
Get an input image  
Output ID if the image is any of the K persons ( or "not recognized")  
1:K  
  
* One-shot learning  
  
Learning a "similarity" function  
d(img1, img2) = degree of difference between images  
if d(img1, img2) <= t "same"  
>t "different"  
  
* Siamese network  
  
Goal of learning  
Parameters of NN define an encoding f(x(i))  
Learn parameters so that:  
If x(i),x(j) are the same person, ||f(x(i)-f(x(j)))||^2 is small  
  

  
