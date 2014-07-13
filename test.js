tokenize('dad cat', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}], cb){}

tokenize('dad 5 cat 234847', [{type: "variable", regex: /[a-z]+/},{type:"whitespace", regex: /\s/}]);
