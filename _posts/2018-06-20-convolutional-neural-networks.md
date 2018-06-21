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

Vertical edge detector:  
![](/assets/images/2018-06-20-convolutional-neural-networks/detect_edges.png)  
1. detect vertical edges  
2. detect horizontal edges  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolve1.png)  
step 1: we have a 6 * 6 * 1 grayscale image, we construct a 3 * 3 filter, and we convolve these two matrices resualt in a 4 * 4 martrixs.  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolve2.png)  
step 2: compute the 1st element of 4 * 4 matrix, we take the 3 * 3 filter and paste it on top of the 3 * 3 region of the original input image. 1st = 3 * 1 + 1 * 1 + 2 * 1 +....+ 2 * -1 = -5  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolve3.png)  
step 3: compute the 2st element of 4 * 4 matrix, we shift it one step, 2st = -4, compute the rest.  

programming language: 
python: conv_forward  
tensorflow: tf.nn.conv2d  
keras: Conv2d  

Why is the vertical edge:  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolve4.png)  
why is the right image in the middle vertical so thick, 'cause the input image is 6 * 6 so small.  
vertical filter |  |   |  | Horizontal | | |
:-:| :-: | :-: | :-: | :-: | :-: | :-: |
1 | 0 | -1 |  | 1 | 1 | 1 |
1 | 0 | -1 |  | 0 | 0 | 0 |
1 | 0 | -1 |  | -1| -1| -1|  


