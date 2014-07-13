//tokenize('dad cat', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}], cb){}

//tokenize('dad 5 cat 234847', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}]);
var assert = require('assert');
describe('tokenize', function() {
  var tokenize = require('./');
  it('should be a function', function() {
    tokenize.should.be.type('function');
  })
  it('should return an array of results', function(done) {
    tokenize('dad cat', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}], function(err, results){
      results.should.be.an.instanceOf(Array);
      assert.deepEqual(results,[
        {
          type: "variable",
          value: "dad",
          index: 0
        },
        {
          type: "whitespace",
          value: " ",
          index: 3
        },
        {
          type: "variable",
          value: "cat",
          index: 4
        }
      ]);
      done(err);
    });
  })
})

