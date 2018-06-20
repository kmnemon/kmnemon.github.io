---
title: Convolutional Neural Networks
author: ke
layout: post
tags: deep_learning
---

* Computer vision  
  
Image Classification  
Object detection  
Neural Style Transfer  
  
* Edge detection  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/computer_vision.png)  
1. the early layer of nerual networks detect edges  
2. somewhat later layers might detect parts of objects  
3. even later layers maybe detect parts of complete objects  

Detect edges:  
![](/assets/images/2018-06-20-convolutional-neural-networks/detect_edges.png)  
1. detect vertical edges  
2. detect horizontal edges  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolve1.png)  
step 1: we have a 6*6*1 grayscale image, we construct a 3*3 filter, and we convolve these two matrixs  
step 2: 