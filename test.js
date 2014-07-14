//tokenize('dad cat', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}], cb){}

//tokenize('dad 5 cat 234847', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}]);
var assert = require('assert');
describe('tokenize', function() {
  var tokenize = require('./');
  it('should be a function', function() {
    tokenize.should.be.type('function');
  });
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

  it('should handle strings whose contents can match other tokens', function(done){
    var tokenSpecs = [
      {type: 'whitespace', regex: /\s+/},
      {type: 'variable', regex: /[a-z]+/},
      {type: 'string', regex: /"[^"]+"/}
    ];
    tokenize('  "  "  asdf "asdf"', tokenSpecs, function(err, results){
      assert.deepEqual(results, [
        {
          type: 'whitespace',
          value: '  ',
          index: 0
        },
        {
          type: 'string',
          value: '"  "',
          index: 2
        },
        {
          type: 'whitespace',
          value: '  ',
          index: 6
        },
        {
          type: 'variable',
          value: 'asdf',
          index: 8
        },
        {
          type: 'whitespace',
          value: ' ',
          index: 12
        },
        {
          type: 'string',
          value: '"asdf"',
          index: 13
        }
      ]);
      done(err);
    });
  });
  it('should handle repetitive tokens', function(done){
    var tokenSpecs = [
      {type: 'a', regex: /a/},
      {type: 'b', regex: /b/}
    ];
    tokenize('abab', tokenSpecs, function(err, results){
      assert.deepEqual(results, [
        {
          type: 'a',
          value: 'a',
          index: 0
        },
        {
          type: 'b',
          value: 'b',
          index: 1
        },
        {
          type: 'a',
          value: 'a',
          index: 2
        },
        {
          type: 'b',
          value: 'b',
          index: 3
        }
      ]);
      done(err);
    });
  });

  it('should return an array of bad tokens', function(done) {
    tokenize('dad 5 cat 234847', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}], function(err, results){
      assert.deepEqual(results, [
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
          type: "whitespace",
          value: " ",
          index: 5
        },
        {
          type: "variable",
          value: "cat",
          index: 6
        },
        {
          type: "whitespace",
          value: " ",
          index: 9
        }
      ]);
      assert.deepEqual(err, [
        {
          value: "5",
          index: 4
        },
        {
          value: "234847",
          index: 10
        },
      ]);
      done();
    });
  });
});
