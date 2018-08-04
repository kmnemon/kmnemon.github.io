---
title: Sequence to sequence models
author: ke
layout: post
tags: deep_learning
---

* Basic models  
  
![](/assets/images/2018-08-01-sequence-to-sequence-models/sequence_tosequence_model.png) 
![](/assets/images/2018-08-01-sequence-to-sequence-models/image_captioning.png) 
  
* Beam search  
  
Step1:  
![](/assets/images/2018-08-01-sequence-to-sequence-models/beam_search_step1.png)  
Step2:  
![](/assets/images/2018-08-01-sequence-to-sequence-models/beam_search_step2.png)  
Step3:  
![](/assets/images/2018-08-01-sequence-to-sequence-models/beam_search_step3.png)  
  
* Refinements to beam search  
  
Length normalization  
![](/assets/images/2018-08-01-sequence-to-sequence-models/lenght_normalization.png)  
  
* Error analysis on beam search  
  
![](/assets/images/2018-08-01-sequence-to-sequence-models/example.png)  
Human: Jane visite Africa in September.(y* )  
Algorithm: Jane visited Africa last September.(y^)  
Case 1: P(y* |x) > p(y^|x)  
Beam search chose y^. But y* attains higerP(y|x).
Conclusion: Beam search is at fault.  
Case 2: P(y* |x) <= P(y^|x)  
y* is a better translation than Y^. But RNN predictedP(y* |x)<P(y^|x).  
Conclusion: RNN model is at fault.  

Through much of up process, figures out what faction of errors are "due to" beam search vs. RNN model.(BRBRBBBBRRR which one is the most)  
  
* Bleu score  
  
![](/assets/images/2018-08-01-sequence-to-sequence-models/bleu_score_on_bigrams.png)  
![](/assets/images/2018-08-01-sequence-to-sequence-models/bleu_score_on_unigrrams.png)  
![](/assets/images/2018-08-01-sequence-to-sequence-models/bleu_details.png)  
  
* Attention model intuition  
  
![](/assets/images/2018-08-01-sequence-to-sequence-models/attention_model_intuition.png)  
  
* Attention model  
  
![](/assets/images/2018-08-01-sequence-to-sequence-models/attention_model.png)  
![](/assets/images/2018-08-01-sequence-to-sequence-models/acomputing_attention_a.png)  
![](/assets/images/2018-08-01-sequence-to-sequence-models/attn_model.png)  
  
* Speech recognition  
  
x(audio clip)----------------->y(transcript)"the quick brown fox"  
![](/assets/images/2018-08-01-sequence-to-sequence-models/CTC_cost.png)  
  
* Trigger word detection  
  
Trigger word detection algorithm  
![](/assets/images/2018-08-01-sequence-to-sequence-models/trigger_word.png)  
  


  



  












