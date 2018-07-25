---
title: Neural Style Transfer
author: ke
layout: post
tags: deep_learning
---

* neural style transfer  

what are deep convnets learning?  
  
* cost function  

Content c + Style S = Generated image G  
J(G) = alpha * Jcontent(C, G) + beta * Jstyle(S, G)  
  
find the generated image G  
1. Initiate G randomly   
2. Use gradient descent to minimize J(G)  
  
* content cost function  

say you use hidden layer l to compute content cost  
use pre-trained ConvNet.(E.g., VGG network)  
Let a[l]( C) and a[l]( G) be the activation of layer l on the images  
If a[l]( C) and a[l]( G) are similar, both images have similar content  
Jcontent(C,G) = 1/2 ||a[l]( C) - a[l]( C)||^2  
![](/assets/images/2018-07-22-neural_style_transfer/content_cost_function.png)  
Here, nH,nW and nC are the height, width and number of channels of the hidden layer you have chosen, and appear in a normalization term in the cost.   
![](/assets/images/2018-07-22-neural_style_transfer/unrolled_version.png) 
  
* Style cost function  
  
![](/assets/images/2018-07-22-neural_style_transfer/style_matrix.png)  
![](/assets/images/2018-07-22-neural_style_transfer/gram_matrix.png)  
![](/assets/images/2018-07-22-neural_style_transfer/style_cost.png)  
![](/assets/images/2018-07-22-neural_style_transfer/style_weight.png)


  

  


