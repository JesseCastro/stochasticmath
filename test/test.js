const assert = require('assert');
const Matrix = require('../index.js')

var testValues = [
    0, 1/2,   0, 1/2,   0,
  1/2,   0, 1/2,   0,   0,
    0, 1/2,   0,   0, 1/2,
    0,   0,   0,   1,   0,
    0,   0,   0,   0,   1
];

function testEquals(A,B){
  if(A.length != B.length){
    return false
  }
  else{
    for(var i = 0; i < A.length; i++){
      if((Math.round(A[i]*1000)/1000)!=(Math.round(B[i]*1000)/1000)){
        return false
      }
    }
    return true
  }
}

var testMatrix = new Matrix(5,5).setData(testValues);

describe('Absorption Matrix', function() {
  describe('#Q()', function() {
    it('should return expected value for Q', function() {
      var testQValues = [
          0, 1/2,   0,
        1/2,   0, 1/2,
          0, 1/2,   0
      ];
      var compQMatrix = new Matrix(3,3).setData(testQValues);
      var testQMatrix = testMatrix.Q();
      var result = (testQMatrix.equals(compQMatrix))?true:false
      assert.equal(result,true);
    });
  });
  describe('#R()', function() {
    it('should return expected value for R', function() {
      var testRValues = [
        1/2,   0,
          0,   0,
          0, 1/2
      ]
      var compRMatrix = new Matrix(3,2).setData(testRValues);
      var testRMatrix = testMatrix.R();
      var result = (testRMatrix.equals(compRMatrix))?true:false
      assert.equal(result,true);
    });
  });
  describe('#I()', function() {
    it('should return expected value for I', function() {
      var testIValues = [
          1,   0,
          0,   1
      ]
      var compIMatrix = new Matrix(2,2).setData(testIValues);
      var testIMatrix = testMatrix.I();
      var result = (testIMatrix.equals(compIMatrix))?true:false
      assert.equal(result,true);
    });
  });
  describe('#ZERO()', function() {
    it('should return expected value for ZERO', function() {
      var testZeroValues = [
          0,   0,   0,
          0,   0,   0
      ]
      var comp0Matrix = new Matrix(2,3).setData(testZeroValues);
      var test0Matrix = testMatrix.ZERO();
      var result = (test0Matrix.equals(comp0Matrix))?true:false
      assert.equal(result,true);
    });
  });
  describe('#N()', function() {
    it('should return expected value for N', function() {
      var testNValues = [
        3/2,   1, 1/2,
          1,   2,   1,
        1/2,   1, 3/2
      ]
      var compNMatrix = new Matrix(3,3).setData(testNValues);
      var testNMatrix = testMatrix.N();
      var result = (testNMatrix.equals(compNMatrix))?true:false
      assert.equal(result,true);
    });
  });
  describe('#NFast()', function() {
    it('should return expected value for NFast', function() {
      var testNValues = [
        3/2,   1, 1/2,
          1,   2,   1,
        1/2,   1, 3/2
      ]
      var compNMatrix = new Matrix(3,3).setData(testNValues);
      var testNMatrix = testMatrix.NFast();
      //var result = (testNMatrix.equals(compNMatrix))?true:false
      //assert.equal(result,true);
      assert.equal(testEquals(testNMatrix,compNMatrix),true)
    });
  });
  describe('#M()', function() {
    it('should return expected value for M', function() {
      var testMValues = [
        3/4, 1/4,
        1/2, 1/2,
        1/4, 3/4
      ]
      var compMMatrix = new Matrix(3,2).setData(testMValues);
      var testMMatrix = testMatrix.M();
      var result = (testMMatrix.equals(compMMatrix))?true:false
      assert.equal(result,true);
    });
  });
  describe('#MFast()', function() {
    it('should return expected value for MFast', function() {
      var testMValues = [
        3/4, 1/4,
        1/2, 1/2,
        1/4, 3/4
      ]
      var compMMatrix = new Matrix(3,2).setData(testMValues);
      var testMMatrix = testMatrix.MFast();
      console.log('comp',compMMatrix.toLogString())
      console.log('test',testMMatrix.toLogString())
      assert.equal(testEquals(compMMatrix,testMMatrix),true);
    });
  });
  describe('#probability()', function() {
    it('should return expected value for 1(idx 0),HOME(idx 1)', function() {
      var result = testMatrix.probability(0,1)
      assert.equal((Math.round(result*10000)/10000),1/4);
    });
    it('should return expected value for 2(idx 1),HOME(idx 1)', function() {
      var result = testMatrix.probability(1,1)
      assert.equal((Math.round(result*10000)/10000),1/2);
    });
  });
});
