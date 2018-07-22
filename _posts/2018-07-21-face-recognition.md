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
else >t "different"  
  
* Siamese network  
  
![](/assets/images/2018-07-21-face-recognition/siamese_network.png)  
Goal of learning  
Parameters of NN define an encoding f(x(i))  
Learn parameters so that:  
If x(i),x(j) are the same person, ||f(x(i)-f(x(j)))||^2 is small  
[Taigman et. al., 2014. DeepFace closing the gap to human level performance]  
  
* Triplet loss  
  
learning_objective  
![](/assets/images/2018-07-21-face-recognition/learning_objective.png)  
want: ||f(A) - f(P)||^2 <= ||f(A) - f(N)||^2  
||f(A) - f(P)||^2 - ||f(A) - f(N)||^2 <= 0  
||f(A) - f(P)||^2 - ||f(A) - f(N)||^2 + alpha <= 0  
  
Loss function:  
L(A,P,N) = max(||f(A) - f(P)||^2 - ||f(A) - f(N)||^2 + alpha, 0)  
J = E(i=1,m) L(A(i), P(i), N(i))  
  
choose triplets that're "hard" to train on.  
  
* Face verification and binary classification  
  
![](/assets/images/2018-07-21-face-recognition/binary_classification.png)  
![](/assets/images/2018-07-21-face-recognition/face_verification_train.png)  
[Taigman et. al., 2014. DeepFace closing the gap to human level performance]  
  
* 



  
