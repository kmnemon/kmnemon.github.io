---
title: Recurrent Neural Networks(RNN)
author: ke
layout: post
tags: deep_learning
---

* Recurrent Neural Networks

what are deep convnets learning?  
  
![](/assets/images/2018-07-23-recurrent-Neural-networks/recurrent1.png)  
![](/assets/images/2018-07-23-recurrent-Neural-networks/recurrent2.png)  
![](/assets/images/2018-07-23-recurrent-Neural-networks/recurrent3.png)  
  
*  RNN types  
  
![](/assets/images/2018-07-23-recurrent-Neural-networks/RNN_types.png)  
  
* Language model  
  
you are using speech recognition and get the following two sentence:  
The apple and pair salad.  
The apple and pear salad.  
  
whick one is the prefer one?  

using language model to get the prossibility of these sentence, choose the better one:  
p(The apple and pair salad) = 3.2 * 10^-13
p(The apple and pear salad) = 5.7 * 10^-10

The apple and pear salad is the better one sentence  
  
![](/assets/images/2018-07-23-recurrent-Neural-networks/RNN_model.png)  
P(y<1>, y<2>, y<3>) = p(y<1>) * p(y<2>|y<1>) * p(y<3>|y<1>,y<2>)  
  
* Sampling novel sequences  
  
Sampling a sequence from a trained RNN  
![](/assets/images/2018-07-23-recurrent-Neural-networks/sampling.png)  
  
* Vanishing gradients with RNNs  
  
exploding gradient can use gradient clipping to slove the problem----look at your vectors, and if it is bigger than some threshold, rescale some of your gradient vector so that is not too big.  
  
vanishing gradients see the follow  
  
* Gated Recurrent Unit(GRU)  
  
![](/assets/images/2018-07-23-recurrent-Neural-networks/RNN_unit.png)  
![](/assets/images/2018-07-23-recurrent-Neural-networks/GRU-simple.png)  
![](/assets/images/2018-07-23-recurrent-Neural-networks/GRU-full.png)  
  
* LSTM(long short term memory) unit  
  
![](/assets/images/2018-07-23-recurrent-Neural-networks/GRU-LSTM.png)  
![](/assets/images/2018-07-23-recurrent-Neural-networks/LSTM.png)  
  
* Bidirectional RNN  
  





  


