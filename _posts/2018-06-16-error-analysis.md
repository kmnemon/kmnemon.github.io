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
- | :-: | - | -
1 |  | O |   | pitball 
2 |  |   | O |
3 |  |   | O |
. |O |   |   |
% of total | | |
  
  
  
| abc | def |
| --- | --- |
| bar | baz |