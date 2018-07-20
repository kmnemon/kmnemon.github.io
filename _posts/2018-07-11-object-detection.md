---
title: Object Detection
author: ke
layout: post
tags: deep_learning
---

* Object localization  
  
Classification with localization  
![](/assets/images/2018-07-11-object-detection/classification_with_localization.png)  
  
Defining the target label y  
![](/assets/images/2018-07-11-object-detection/defining_the_target_label_y.png)  
  
* Landmark detection  
  
output more landmarks(x, y) to detect the key point of the image.  
  
* Object detection  
  
Using sliding windows detection algorithm  
![](/assets/images/2018-07-11-object-detection/sliding_windows_detection.png)  
  
* Convolutional implementation of sliding windows  
  
[Sermanet et al., 2014, Overfeat:Integrated recognition, localization and detection using convolutional networks]  
Turning FC layer into convolutional layers  
FC = 1 * 1 * channel  
![](/assets/images/2018-07-11-object-detection/fc_to_convolutional.png)  
![](/assets/images/2018-07-11-object-detection/convolution_imp_sliding_windows.png)  
  
* Bounding box predictions  
  
YOLO algorithm, [Redmon et al. 2015, You Only Look Once: Unified real-time object detection]  
1. look at the mid point of an object  
2. assign that object to whichever one grid cell contains the id point of the object  
3. using image classification and localizaiton algorithm to bounding box the object  
  
![](/assets/images/2018-07-11-object-detection/YOLO_algorithm.png)  
![](/assets/images/2018-07-11-object-detection/specify_the_bounding_box.png)  
  
* Intersection over union  
  
More generally, IoU is a measure of the overlap between two bounding boxes.  
![](/assets/images/2018-07-11-object-detection/IOU.png)  
  
* Non-max suppression  
  
Each output prediction is: [pc, bx, by, bh, bw], discard all boxes with pc<= 0.6  
While there are any remaining boxes:  
. Pick the box with the largest pc Output that as a prediction.  
. Discard any remaining box with IoU >= 0.5 with the box output in the previous step  
  
* Anchor boxes  
  
[Redmon et al., 2015, You Onlu Look Once: Unified real-time object detection]  
  
* YOLO  
  
1. for each grid call, get 2 predicted bounding boxes.  
![](/assets/images/2018-07-11-object-detection/output_non_max_1.png)  
2. get rid of low probability predictions  
![](/assets/images/2018-07-11-object-detection/output_non_max_2.png)  
3. for each class(pedestrian, car, motorcycle) use non-max suppression to generate final predictions.
![](/assets/images/2018-07-11-object-detection/output_non_max_3.png)  
  
* Region proposals  
  



  


  




  

  




  




