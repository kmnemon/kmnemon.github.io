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

vertical filter |  |  |  | Horizontal filter| | |
:-:| :-: | :-: | :-: | :-: | :-: | :-: |
1 | 0 | -1 |  | 1 | 1 | 1 |
1 | 0 | -1 |  | 0 | 0 | 0 |
1 | 0 | -1 |  | -1| -1| -1|
  
positive edge: light to dark  
negative edge: dark to light  

sobel filter |  |  |  | Schar filter| | |
:-:| :-: | :-: | :-: | :-: | :-: | :-: |
1 | 0 | -1 |  | 3 | 0 | -3 |
2 | 0 | -2 |  | 10 | 0 | -10 |
1 | 0 | -1 |  | 3| 0 | -3|
  
Advantage:  a little bit more robust  
  
in the deep learning you could learn the 9 parameters.  

* Padding  
  
in the previous example the disadvantage of edge detector is:  
1. image shrink  
2. throw away information from the edge of image  

![](/assets/images/2018-06-20-convolutional-neural-networks/padding.png)  
padding = 1  
  
how much to pad?
Valid convolutions: no padding  
Same convolutions: Pad so that output size is the same as the input size  
filters: odd-number 3 * 3(common), 5 * 5, 7 * 7  
  
* Strided convolutions  
  
n * n image, f * f filter, padding p, stride s, the output = [(n +2p -f)/s +1] * [(n +2p -f)/s +1]  rounding down  
  
* Convolutions over volumes  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolution_RGB.png)  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolution_RGB2.png)  
  
* One layer of a convolutional network  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolution_one_layer.png)  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolution_notation.png)  
  
* A simple convolution network example  

  




  




