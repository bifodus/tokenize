//tokenize('dad cat', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}], cb){}

//tokenize('dad 5 cat 234847', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}]);
describe('tokenize', function() {
  var tokenize = require('./');
  it('should be a function', function() {
    tokenize.should.be.type('function');
  })
})

