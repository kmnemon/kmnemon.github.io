---
title: NLP and Word Embeddings
author: ke
layout: post
tags: deep_learning
---

* Word representation  
    
Featurized representation: word enbedding  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/featurized_representation.png)  
Visualizing word embeddings:  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/visualizing_word_embeddings.png)  
  
* Using word embeddings  
  
1. Learn word embeddings from large text corpus.(1-100B words)  
(Or download pre-trained embedding online.)  
  
2. Transfer embedding to new task with smaller training set.  
(say, 100k words)  
  
3. Optional: Continue to finetune the word embeddings with new data.  
  
* Properties of word embeddings  
  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/analogies.png)  
  
Cosine similarity:  
sim(ew, eking - eman + ewoman)  
sim(u,v) = (u.T * v) / ||v||2 * ||v||2  
  
* Embedding matrix  
  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/embedding_matrix.png)  
  
* Learning word embeddings  
  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/learning_embedding.png)  
The softmax output the probability of juice, p(juice)  
  
* Word2Vec  
  
Skip-grams  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/skip_grams.png)  
  
* Negative sampling  
  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/snegative_sampling.png)  

* GloVe(global vectors for word representation)  
  
i want a glass of orange juice to go alone with my cereal.  
  
c, t  
Xij = #times i(t) appears in content of j(c)  
  

![](/assets/images/2018-07-30-NLP-and-word-embeddings/GloVe_model.png)  

* Sentiment classification  

sentiment classification problem:    
![](/assets/images/2018-07-30-NLP-and-word-embeddings/sentiment_classification_problem.png)    
simple sentiment classification model  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/simple_sentiment_classification_model.png)  
  
RNN for sentiment classification  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/RNN_for_sentiment_classification.png)  

* Debiasing word embeddings  
  
![](/assets/images/2018-07-30-NLP-and-word-embeddings/addressing_bias.png)  
  
  










