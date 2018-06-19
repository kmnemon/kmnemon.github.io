---
title: Error analysis
author: ke
layout: post
tags: deep_learning
---

* Carrying out error analysis  
  
look at dev examples to evaluate ideas: if you have a cat classifier, this classifier have 90% accuracy, in the other words 10% error, the team member find out that the classifer mis-recoginize the dog pic to be the cat. the question is:  
Should you try to make your cat classifier do better on dogs?  
error analysis procedure:  
1. Get ~100 mislabeled dev set examples.  
2. Count up how many are dogs.  

Image | Dog | Great cat | comments 
- | :-: | :-: | :-:
1 |  | O |   | pitball 
2 |  |   | O |
3 |  |   | O |
. |O |   |   |
% of total | 5% | 95% |  
  
focus on Great cat problem will have better performance improve.  
  
* Cleaning up incorrectly labeled data  
  
Training set:  
DL algorithms are quite robust to random errors in the training set. if the error is not too far from random, just leave them and not spend too much time fixing them.  
They are less robust to systematic errors. if your labeler consistently labels white dogs as cats, then your classifier will consider white dogs as cats.  
  
Dev set or Test set:  
doing error analysis and add incorrectly labedled  
  
Image | Dog | Great cat | Incorrectly labeled |comments 
- | :-: | :-: | :-: | :-:
1 |  | O |   | pitball | 
2 |  |   | O | | 
3 |  |   | O | | 
. |O |   |   | | 
% of total | 5% | 89% | 6% | 
  
the next steps:  
Overall dev set error .....10%  
Errors due incorrent labels.......0.6%  
Errors due to other causes........9.4%  
  
fix the other causes is prior to fix the mislabels.  
  
Overall dev set error .....2%  
Errors due incorrent labels.......0.6%  
Errors due to other causes........1.4%
  
fix the incorrect label is on your way, because goal of dev set is to help you select between two classifiers A & B, now such high incorrect labal can not tell you which classifier is better.   
  
Guidelines:  
1. Apply same process to your dev and test sets to make sure they continue to come from the same distribution(fix the dev and test set all together)  
2. Consider examining examples your algorithm got right as well as ones it got wrong.  (98% accuracy 2% error, Donot just consider the 2% error's mislabel, consider the 98% mislabel as well)  
3. Train and dev/test data may now come from slightly different distributions.  
  
* Transfer learning  

you have a cat classifier, trained from deep learning nerual. and now you have another set of diagnose image, you want bulid a diagnose classifier, so here is what you can do:  
if you have small diagnose image set, base on the catclassifier train result, you just initialize last one or two layer's weight( w[l], b[l]), fixed the others and retrain it with new diagnose classifier.  
if you have large diagnose image set, base on the catclassifier train result, you just retrain all the neraul.  
in the previous example the cat train process is called pre-training, after that you use other set to train on it is called fine tuning.  
  
When transfer learning makes sense?  
Task from A->B
1. Task A and B have the same input x  
2. You have a lot more data for task A than task B  
3. Low level features from A could be helpful for learning B  
  
* Multi-task learning  
  
![](/assets/images/2018-06-16-error-analysis/autonomous_driving.png)  
![](/assets/images/2018-06-16-error-analysis/multi_task_learning.png)  
in this auto drive example we need predict four things:  
1. is there a pedestrian?  
2. is there a car here?  
3. is there a stop sgin?  
4. is there a traffic light?  
  
the Loss: yhat(i) (4,1)  
1/m E(i=1~m) E(j=1~4) L(yhatj(i), yj(i))  
unlike softmax, this is one image can have multiple labels.  
  
When multi-task learning makes sense:  
1. Traning on a set of tasks that could benefit from having shared lower-level features.  
2. Usually: Amount of data you have for each task is quite similar.  
3. Can train a big enough neural network to do well on all the tasks.  
  
* End-to-end deep learning  
  
Speech recognition example:  
traditional ML way:
X(audio)--(MFCC)-->features(extract some hand-designed features)--(ML)-->Phonemes("c-a-t")---->Words---->Y(transcript)
deep learning way:  
X(audio)-----------------------------------DL-------------------------------------->Y(transcript)  
  
Face recognition example:
use intermediate way:  
![](/assets/images/2018-06-16-error-analysis/face_recognition.png)  
1. use deep learning to find out where is the face and cut it, zoom in it, and put it in the center.  
2. use deep learning to find out who they are.  
  
* Pros and cons of end-to-end deep learning  
  
Pros:  
-- Let the data speak  
-- Less hand-designing of components needed  
  
Cons:  
-- May need large amount of data  
-- Excludes potentially useful hand-designed components  
  
Applying end-to-end deep learning  
Key question: Do you have sufficient data to learn a function of the complexity needed to map x to y?  
  
Auto drive example:  
image(radar,lidar)----(DL)--->cars, pedestrains----(motion planning)---->route---(control aglorithm)-->steering  

  














 




 