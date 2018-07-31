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
  
* Word2Vec  
  
Skip-grams  


