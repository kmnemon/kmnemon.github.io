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
  
* 




 




 