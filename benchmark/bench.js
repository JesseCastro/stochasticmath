var Matrix = require('../index.js')

function createTestMatrix(x){
  var val = []

  var future = 0;
  for(var i = 0; i < x; i++){
    if(i < (x - 2)){
      for(var j = 0; j < x; j++){
        if(x - j == 2){
          var current = Math.random()
          val.push(current)
          future = 1 - current
        }
        else if(x - j == 1){
          val.push(Math.random())
        }
        else{
          val.push(future)
        }
      }
    }
    else{
      for(var j = 0; j < x; j++){
        if(i == j){
          val.push(1)
        }
        else{
          val.push(0)
        }
      }
    }
  }
  var mat = new Matrix(x,x)
  mat.setData(val)
  mat.Q()
  return mat
}

for(var i = 1; i <= 16; i++){
  var start = process.hrtime()[1];
  var mat = createTestMatrix(i)
  mat.MFast()
  //console.log(mat)
  var end = process.hrtime()[1];
  console.log('process '+i+' took '+ (end - start))
}
