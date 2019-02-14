# Stochastic Matrix Math

This library is based on the most excellent [matrix math](https://www.npmjs.com/package/matrixmath) library by [koggdal](https://www.npmjs.com/~koggdal).  It is an extension thereof, and exposes all the same methods/properties as that library.  In addition, it exposes the following instance methods:

## Meta-data

Information about the matrix itself.  

### matrix.isStochastic()

Returns true if this is a stochastic matrix and false if not.

### matrix.numAbsorptionStates()

Returns the number of absorption states for this matrix.



## Matrix parts

A stochastic matrix is divided into four parts:
```
 Q  |  R
 -------
 0  |  I
```
t is the number of transient states
r is the number of absorption states
Q is a t x t matrix
R is a non-zero t x r matrix
0 is an r x t matrix of all zeros
I is the r x r identity matrix
N is the fundamental matrix of the matrix
M is the absorption probabilities matrix of the matrix

### matrix.Q()

Returns the Q portion of the matrix.  

### matrix.R()

Returns the R portion of the matrix.  

### matrix.I()

Returns the I portion of the matrix.  

### matrix.ZERO()

Returns the 0 portion of the matrix.  

### matrix.N()

Returns the fundamental matrix of the matrix.

### matrix.M()

Returns the absorption probability matrix of the matrix.

## Convenience methods

### matrix.probability(i,j)

Returns the probability of being absorbed by state j when starting from state i.

### matrix.fetch(i,j)

Fetches the value at row i, column j.  
