const Matrix = require('matrixmath/Matrix')

Matrix.prototype.isStochastic = function(){
  if(
    this.numAbsorptionStates != -1
    && this.Q != -1
    && this.R != -1
    && this.I != -1
    && this.ZERO != -1
  ){
    return true;
  }
  else{
    return false;
  }
}

Matrix.prototype.numAbsorptionStates = function(){
  var cardinality = this.length;
  var rows = cols = this.rows;

  // This is not a stochastic matrix
  if(!Number.isInteger(Math.sqrt(cardinality))){
    return -1
  }
  // Meets stochastic shape
  else{
    var numAbsorptionStates = 0;
    for(var i = 0; i < rows; i++){
      var absorption = true;
      for(var j = 0; j < cols; j++){
        var idx = i*rows + j;
        var value = this[idx];
        if(value!=0 && value!=1){
          absorption = false;
        }
        else if((i == j)&&(value!=1)){
          absorption = false
        }
        else if((i!=j)&&(value == 1)){
          absorption = false
        }
      }
      if(absorption){
        numAbsorptionStates++;
      }
    }
    return (numAbsorptionStates <= 0)?-1:numAbsorptionStates
  }

}

Matrix.prototype.Q = function(){
  var cardinality = this.length;

  // This is not a stochastic matrix
  if(!Number.isInteger(Math.sqrt(cardinality))){
    return -1
  }
  // Meets stochastic shape
  else{
    var rows = this.rows;
    var qrows = qcols = rows - this.numAbsorptionStates()

    var values = [];

    var hasAbsorption = false;
    for(var i = 0; i < qrows; i++){
      for(var j = 0; j < qcols; j++){
        var index = i * this.rows + j;
        var value = this[index];
        values.push(value)
      }
    }
    var matrix = new Matrix()
    matrix.setData(values, Math.sqrt(values.length), Math.sqrt(values.length))
    return matrix;
  }
}

Matrix.prototype.R = function(){
  var cardinality = this.length;

  // This is not a stochastic matrix
  if(!Number.isInteger(Math.sqrt(cardinality))){
    return -1
  }
  // Meets stochastic shape
  else{
    var rows = this.rows;
    var qrows = rows - this.numAbsorptionStates()
    var qcols = this.numAbsorptionStates()
    var start = this.cols - this.numAbsorptionStates()

    var values = [];

    var hasAbsorption = false;
    for(var i = 0; i < qrows; i++){
      for(var j = start; j < this.cols; j++){
        var index = i * this.rows + j;
        var value = this[index];
        values.push(value)
        if(value == 1){
          hasAbsorption = true;
        }
      }
    }
    //should not have absorption states
    //if(hasAbsorption){
    //  return -1
    //}
    //else{
      var matrix = new Matrix()
      matrix.setData(values, qrows, qcols)

      return matrix;
    //}
  }
}

Matrix.prototype.I = function(){
  var cardinality = this.length;
  // This is not a stochastic matrix
  if(!Number.isInteger(Math.sqrt(cardinality))){
    return -1
  }
  // Meets stochastic shape
  else{
    var rows = this.rows;
    var start = this.cols - this.numAbsorptionStates();

    var values = [];

    var absorption = true;
    for(var i = start; i < this.rows; i++){
      for(var j = start; j < this.cols; j++){
        var index = i * this.rows + j;
        var value = this[index];
        values.push(value)
        if(value!=0 && value!=1){
          absorption = false;
        }
      }
    }
    //should be all 0's and 1's
    if(!absorption){
      return -1
    }
    else{
      var matrix = new Matrix()
      matrix.setData(values, Math.sqrt(values.length), Math.sqrt(values.length))
      return matrix;
    }
  }
}

Matrix.prototype.ZERO = function(){
  var cardinality = this.length;

  // This is not a stochastic matrix
  if(!Number.isInteger(Math.sqrt(cardinality))){
    return -1
  }
  // Meets stochastic shape
  else{
    var rows = this.rows;
    var qcols = rows - this.numAbsorptionStates()
    var qrows = this.numAbsorptionStates()
    var start = rows - this.numAbsorptionStates()

    var values = [];

    var clear = true;
    for(var i = start; i < this.rows; i++){
      for(var j = 0; j < qcols; j++){
        var index = i * this.rows + j;
        var value = this[index];
        values.push(value)
        if(value != 0){
          clear = false;
        }
      }
    }
    //should be all 0's
    if(!clear){
      return -1
    }
    else{
      var matrix = new Matrix()
      matrix.setData(values, qrows, qcols)
      return matrix;
    }
  }
}

Matrix.prototype.N = function(){
  if(!this.isStochastic()){
    return -1;
  }
  else{
    var Q = this.Q();
    var It = new Matrix(Q.rows, Q.cols, false).setIdentityData();
    var parent = Matrix.subtract(It,Q);
    parent.invert()
    return parent
  }
}

Matrix.prototype.M = function(){
  if(!this.isStochastic()){
    return -1
  }
  else{
    var cardinality = this.length;
    var rows = this.length / 2;
    var N = this.N();
    var R = this.R();
    return Matrix.multiply(N,R);
  }
}

Matrix.prototype.probability = function(i,j){
  if(!this.isStochastic()){
    return -1
  }
  else{
    var cardinality = this.length;
    var rows = this.rows;
    var M = this.M();
    return M.fetch(i,j)
  }
}

Matrix.prototype.fetch = function(row,col){
  var index = row * this.cols + col;
  return this[index];
}

module.exports = Matrix;
