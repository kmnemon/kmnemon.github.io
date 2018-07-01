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
caculate 3 * 3 * 3 = 27 numbers and sum up all equal to one of 4 * 4 numbers.  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolution_RGB2.png)  
  
* One layer of a convolutional network  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolution_one_layer.png)  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolution_notation.png)  
  
* A simple convolution network example  
  
Types of layer in a convolutional network:  
-Convolution(coun)  
-Polling(Pool)  
-Fully connected(FC)  
  
* Pooling layers  
  
Max pooling:  
![](/assets/images/2018-06-20-convolutional-neural-networks/max_pooling.png)  

Average pooling:  
![](/assets/images/2018-06-20-convolutional-neural-networks/average_pooling.png)  
  
Hyperparameters:  
f: filter size  
s: stride  
common: f = 2, s= 2; f = 3, s = 2  
the output channel(n_C) equal to the input channel(n_pre_C), intput: 3 * 3 * n_pre_C output: f * f * n_C  
there is nothing to learn, just a fix function  
  
* Convolutional neural network example  
  
![](/assets/images/2018-06-20-convolutional-neural-networks/convolutional_neural_network.png)  
  
  nn | Activation shape | Activation size | #parameters
:-:| :-: | :-: | :-: 
Input: | (32,32,3) | 3072(a[0]) | 0 
CONV1 (f=5, s=1) | (28,28,8) | 6272 | 208 
POOL1 | (14,14,8) | 1568 | 0 
CONV2 (f=5, s=1) | (10,10,16) | 1600 | 416 
POOL2 | (5,5,16) | 400 | 0 
FC3 | (120,1) | 120 | 48,001
FC4 | (84,1) | 84 | 10,081
Softmax | (10,1) | 10 | 841
  
* Why convolutions  
1. Parameter sharing: A feature detector(such as a vertical edge detector) that's useful in one part of the image is probably useful in another part of the image  
2. Sparsity of connections: In each layer, each output value depends only on a small number of inputs.  
  
* CNN Backpropagation  
  
## 5 - Backpropagation in convolutional neural networks (OPTIONAL / UNGRADED)

In modern deep learning frameworks, you only have to implement the forward pass, and the framework takes care of the backward pass, so most deep learning engineers don't need to bother with the details of the backward pass. The backward pass for convolutional networks is complicated. If you wish however, you can work through this optional portion of the notebook to get a sense of what backprop in a convolutional network looks like. 

When in an earlier course you implemented a simple (fully connected) neural network, you used backpropagation to compute the derivatives with respect to the cost to update the parameters. Similarly, in convolutional neural networks you can to calculate the derivatives with respect to the cost in order to update the parameters. The backprop equations are not trivial and we did not derive them in lecture, but we briefly presented them below.

### 5.1 - Convolutional layer backward pass 

Let's start by implementing the backward pass for a CONV layer. 

#### 5.1.1 - Computing dA:
This is the formula for computing $dA$ with respect to the cost for a certain filter $W_c$ and a given training example:

$$ dA += \sum _{h=0} ^{n_H} \sum_{w=0} ^{n_W} W_c \times dZ_{hw} \tag{1}$$

Where $W_c$ is a filter and $dZ_{hw}$ is a scalar corresponding to the gradient of the cost with respect to the output of the conv layer Z at the hth row and wth column (corresponding to the dot product taken at the ith stride left and jth stride down). Note that at each time, we multiply the the same filter $W_c$ by a different dZ when updating dA. We do so mainly because when computing the forward propagation, each filter is dotted and summed by a different a_slice. Therefore when computing the backprop for dA, we are just adding the gradients of all the a_slices. 

In code, inside the appropriate for-loops, this formula translates into:
```python
da_prev_pad[vert_start:vert_end, horiz_start:horiz_end, :] += W[:,:,:,c] * dZ[i, h, w, c]
```

#### 5.1.2 - Computing dW:
This is the formula for computing $dW_c$ ($dW_c$ is the derivative of one filter) with respect to the loss:

$$ dW_c  += \sum _{h=0} ^{n_H} \sum_{w=0} ^ {n_W} a_{slice} \times dZ_{hw}  \tag{2}$$

Where $a_{slice}$ corresponds to the slice which was used to generate the acitivation $Z_{ij}$. Hence, this ends up giving us the gradient for $W$ with respect to that slice. Since it is the same $W$, we will just add up all such gradients to get $dW$. 

In code, inside the appropriate for-loops, this formula translates into:
```python
dW[:,:,:,c] += a_slice * dZ[i, h, w, c]
```

#### 5.1.3 - Computing db:

This is the formula for computing $db$ with respect to the cost for a certain filter $W_c$:

$$ db = \sum_h \sum_w dZ_{hw} \tag{3}$$

As you have previously seen in basic neural networks, db is computed by summing $dZ$. In this case, you are just summing over all the gradients of the conv output (Z) with respect to the cost. 

In code, inside the appropriate for-loops, this formula translates into:
```python
db[:,:,:,c] += dZ[i, h, w, c]
```

**Exercise**: Implement the `conv_backward` function below. You should sum over all the training examples, filters, heights, and widths. You should then compute the derivatives using formulas 1, 2 and 3 above. 


```python
def conv_backward(dZ, cache):
    """
    Implement the backward propagation for a convolution function
    
    Arguments:
    dZ -- gradient of the cost with respect to the output of the conv layer (Z), numpy array of shape (m, n_H, n_W, n_C)
    cache -- cache of values needed for the conv_backward(), output of conv_forward()
    
    Returns:
    dA_prev -- gradient of the cost with respect to the input of the conv layer (A_prev),
               numpy array of shape (m, n_H_prev, n_W_prev, n_C_prev)
    dW -- gradient of the cost with respect to the weights of the conv layer (W)
          numpy array of shape (f, f, n_C_prev, n_C)
    db -- gradient of the cost with respect to the biases of the conv layer (b)
          numpy array of shape (1, 1, 1, n_C)
    """
    
    ### START CODE HERE ###
    # Retrieve information from "cache"
    (A_prev, W, b, hparameters) = None
    
    # Retrieve dimensions from A_prev's shape
    (m, n_H_prev, n_W_prev, n_C_prev) = None
    
    # Retrieve dimensions from W's shape
    (f, f, n_C_prev, n_C) = None
    
    # Retrieve information from "hparameters"
    stride = None
    pad = None
    
    # Retrieve dimensions from dZ's shape
    (m, n_H, n_W, n_C) = None
    
    # Initialize dA_prev, dW, db with the correct shapes
    dA_prev = None                           
    dW = None
    db = None

    # Pad A_prev and dA_prev
    A_prev_pad = None
    dA_prev_pad = None
    
    for i in range(None):                       # loop over the training examples
        
        # select ith training example from A_prev_pad and dA_prev_pad
        a_prev_pad = None
        da_prev_pad = None
        
        for h in range(None):                   # loop over vertical axis of the output volume
            for w in range(None):               # loop over horizontal axis of the output volume
                for c in range(None):           # loop over the channels of the output volume
                    
                    # Find the corners of the current "slice"
                    vert_start = None
                    vert_end = None
                    horiz_start = None
                    horiz_end = None
                    
                    # Use the corners to define the slice from a_prev_pad
                    a_slice = None

                    # Update gradients for the window and the filter's parameters using the code formulas given above
                    da_prev_pad[vert_start:vert_end, horiz_start:horiz_end, :] += None
                    dW[:,:,:,c] += None
                    db[:,:,:,c] += None
                    
        # Set the ith training example's dA_prev to the unpaded da_prev_pad (Hint: use X[pad:-pad, pad:-pad, :])
        dA_prev[i, :, :, :] = None
    ### END CODE HERE ###
    
    # Making sure your output shape is correct
    assert(dA_prev.shape == (m, n_H_prev, n_W_prev, n_C_prev))
    
    return dA_prev, dW, db
```


```python
np.random.seed(1)
dA, dW, db = conv_backward(Z, cache_conv)
print("dA_mean =", np.mean(dA))
print("dW_mean =", np.mean(dW))
print("db_mean =", np.mean(db))
```

** Expected Output: **
<table>
    <tr>
        <td>
            **dA_mean**
        </td>
        <td>
            1.45243777754
        </td>
    </tr>
    <tr>
        <td>
            **dW_mean**
        </td>
        <td>
            1.72699145831
        </td>
    </tr>
    <tr>
        <td>
            **db_mean**
        </td>
        <td>
            7.83923256462
        </td>
    </tr>

</table>


## 5.2 Pooling layer - backward pass

Next, let's implement the backward pass for the pooling layer, starting with the MAX-POOL layer. Even though a pooling layer has no parameters for backprop to update, you still need to backpropagation the gradient through the pooling layer in order to compute gradients for layers that came before the pooling layer. 

### 5.2.1 Max pooling - backward pass  

Before jumping into the backpropagation of the pooling layer, you are going to build a helper function called `create_mask_from_window()` which does the following: 

$$ X = \begin{bmatrix}
1 && 3 \\
4 && 2
\end{bmatrix} \quad \rightarrow  \quad M =\begin{bmatrix}
0 && 0 \\
1 && 0
\end{bmatrix}\tag{4}$$

As you can see, this function creates a "mask" matrix which keeps track of where the maximum of the matrix is. True (1) indicates the position of the maximum in X, the other entries are False (0). You'll see later that the backward pass for average pooling will be similar to this but using a different mask.  

**Exercise**: Implement `create_mask_from_window()`. This function will be helpful for pooling backward. 
Hints:
- [np.max()]() may be helpful. It computes the maximum of an array.
- If you have a matrix X and a scalar x: `A = (X == x)` will return a matrix A of the same size as X such that:
```
A[i,j] = True if X[i,j] = x
A[i,j] = False if X[i,j] != x
```
- Here, you don't need to consider cases where there are several maxima in a matrix.


```python
def create_mask_from_window(x):
    """
    Creates a mask from an input matrix x, to identify the max entry of x.
    
    Arguments:
    x -- Array of shape (f, f)
    
    Returns:
    mask -- Array of the same shape as window, contains a True at the position corresponding to the max entry of x.
    """
    
    ### START CODE HERE ### (≈1 line)
    mask = None
    ### END CODE HERE ###
    
    return mask
```


```python
np.random.seed(1)
x = np.random.randn(2,3)
mask = create_mask_from_window(x)
print('x = ', x)
print("mask = ", mask)
```

**Expected Output:** 

<table> 
<tr> 
<td>

**x =**
</td>

<td>

[[ 1.62434536 -0.61175641 -0.52817175] <br>
 [-1.07296862  0.86540763 -2.3015387 ]]

  </td>
</tr>

<tr> 
<td>
**mask =**
</td>
<td>
[[ True False False] <br>
 [False False False]]
</td>
</tr>


</table>

Why do we keep track of the position of the max? It's because this is the input value that ultimately influenced the output, and therefore the cost. Backprop is computing gradients with respect to the cost, so anything that influences the ultimate cost should have a non-zero gradient. So, backprop will "propagate" the gradient back to this particular input value that had influenced the cost. 

### 5.2.2 - Average pooling - backward pass 

In max pooling, for each input window, all the "influence" on the output came from a single input value--the max. In average pooling, every element of the input window has equal influence on the output. So to implement backprop, you will now implement a helper function that reflects this.

For example if we did average pooling in the forward pass using a 2x2 filter, then the mask you'll use for the backward pass will look like: 
$$ dZ = 1 \quad \rightarrow  \quad dZ =\begin{bmatrix}
1/4 && 1/4 \\
1/4 && 1/4
\end{bmatrix}\tag{5}$$

This implies that each position in the $dZ$ matrix contributes equally to output because in the forward pass, we took an average. 

**Exercise**: Implement the function below to equally distribute a value dz through a matrix of dimension shape. [Hint](https://docs.scipy.org/doc/numpy-1.13.0/reference/generated/numpy.ones.html)


```python
def distribute_value(dz, shape):
    """
    Distributes the input value in the matrix of dimension shape
    
    Arguments:
    dz -- input scalar
    shape -- the shape (n_H, n_W) of the output matrix for which we want to distribute the value of dz
    
    Returns:
    a -- Array of size (n_H, n_W) for which we distributed the value of dz
    """
    
    ### START CODE HERE ###
    # Retrieve dimensions from shape (≈1 line)
    (n_H, n_W) = None
    
    # Compute the value to distribute on the matrix (≈1 line)
    average = None
    
    # Create a matrix where every entry is the "average" value (≈1 line)
    a = None
    ### END CODE HERE ###
    
    return a
```


```python
a = distribute_value(2, (2,2))
print('distributed value =', a)
```

**Expected Output**: 

<table> 
<tr> 
<td>
distributed_value =
</td>
<td>
[[ 0.5  0.5]
<br\> 
[ 0.5  0.5]]
</td>
</tr>
</table>

### 5.2.3 Putting it together: Pooling backward 

You now have everything you need to compute backward propagation on a pooling layer.

**Exercise**: Implement the `pool_backward` function in both modes (`"max"` and `"average"`). You will once again use 4 for-loops (iterating over training examples, height, width, and channels). You should use an `if/elif` statement to see if the mode is equal to `'max'` or `'average'`. If it is equal to 'average' you should use the `distribute_value()` function you implemented above to create a matrix of the same shape as `a_slice`. Otherwise, the mode is equal to '`max`', and you will create a mask with `create_mask_from_window()` and multiply it by the corresponding value of dZ.


```python
def pool_backward(dA, cache, mode = "max"):
    """
    Implements the backward pass of the pooling layer
    
    Arguments:
    dA -- gradient of cost with respect to the output of the pooling layer, same shape as A
    cache -- cache output from the forward pass of the pooling layer, contains the layer's input and hparameters 
    mode -- the pooling mode you would like to use, defined as a string ("max" or "average")
    
    Returns:
    dA_prev -- gradient of cost with respect to the input of the pooling layer, same shape as A_prev
    """
    
    ### START CODE HERE ###
    
    # Retrieve information from cache (≈1 line)
    (A_prev, hparameters) = None
    
    # Retrieve hyperparameters from "hparameters" (≈2 lines)
    stride = None
    f = None
    
    # Retrieve dimensions from A_prev's shape and dA's shape (≈2 lines)
    m, n_H_prev, n_W_prev, n_C_prev = None
    m, n_H, n_W, n_C = None
    
    # Initialize dA_prev with zeros (≈1 line)
    dA_prev = None
    
    for i in range(None):                       # loop over the training examples
        
        # select training example from A_prev (≈1 line)
        a_prev = None
        
        for h in range(None):                   # loop on the vertical axis
            for w in range(None):               # loop on the horizontal axis
                for c in range(None):           # loop over the channels (depth)
                    
                    # Find the corners of the current "slice" (≈4 lines)
                    vert_start = None
                    vert_end = None
                    horiz_start = None
                    horiz_end = None
                    
                    # Compute the backward propagation in both modes.
                    if mode == "max":
                        
                        # Use the corners and "c" to define the current slice from a_prev (≈1 line)
                        a_prev_slice = None
                        # Create the mask from a_prev_slice (≈1 line)
                        mask = None
                        # Set dA_prev to be dA_prev + (the mask multiplied by the correct entry of dA) (≈1 line)
                        dA_prev[i, vert_start: vert_end, horiz_start: horiz_end, c] += None
                        
                    elif mode == "average":
                        
                        # Get the value a from dA (≈1 line)
                        da = None
                        # Define the shape of the filter as fxf (≈1 line)
                        shape = None
                        # Distribute it to get the correct slice of dA_prev. i.e. Add the distributed value of da. (≈1 line)
                        dA_prev[i, vert_start: vert_end, horiz_start: horiz_end, c] += None
                        
    ### END CODE ###
    
    # Making sure your output shape is correct
    assert(dA_prev.shape == A_prev.shape)
    
    return dA_prev
```


```python
np.random.seed(1)
A_prev = np.random.randn(5, 5, 3, 2)
hparameters = {"stride" : 1, "f": 2}
A, cache = pool_forward(A_prev, hparameters)
dA = np.random.randn(5, 4, 2, 2)

dA_prev = pool_backward(dA, cache, mode = "max")
print("mode = max")
print('mean of dA = ', np.mean(dA))
print('dA_prev[1,1] = ', dA_prev[1,1])  
print()
dA_prev = pool_backward(dA, cache, mode = "average")
print("mode = average")
print('mean of dA = ', np.mean(dA))
print('dA_prev[1,1] = ', dA_prev[1,1]) 
```

**Expected Output**: 

mode = max:
<table> 
<tr> 
<td>

**mean of dA =**
</td>

<td>

0.145713902729

  </td>
</tr>

<tr> 
<td>
**dA_prev[1,1] =** 
</td>
<td>
[[ 0.          0.        ] <br>
 [ 5.05844394 -1.68282702] <br>
 [ 0.          0.        ]]
</td>
</tr>
</table>

mode = average
<table> 
<tr> 
<td>

**mean of dA =**
</td>

<td>

0.145713902729

  </td>
</tr>

<tr> 
<td>
**dA_prev[1,1] =** 
</td>
<td>
[[ 0.08485462  0.2787552 ] <br>
 [ 1.26461098 -0.25749373] <br>
 [ 1.17975636 -0.53624893]]
</td>
</tr>
</table>

### Congratulations !

Congratulation on completing this assignment. You now understand how convolutional neural networks work. You have implemented all the building blocks of a neural network. In the next assignment you will implement a ConvNet using TensorFlow.
  
  

  

  




  




