'use strict'

module.exports = tokenize;

function tokenize(string, types, cb) {
  var results = [],
      match,
      token,
      regex,
      badTokens = [];

  for(var i in types){
    regex = new RegExp(types[i].regex.source, "g");
    while((match = regex.exec(string)) != null){
      token = {
        type: types[i].type,
        value: match[0],
        index: match.index
      };
      results.push(token);
    }
  }
  results.sort(function(a, b){
    return a.index - b.index
  });

  badTokens = getInvalidTokens(results, string);
  
  return [results, badTokens];
}

function getInvalidTokens(tokenArray, string) {
  var len = tokenArray.length,
      nextIndex,
      difference,
      badTokens = [];

  for(var i = 0; i < len; i++) {
    nextIndex = (i < len-1 ? tokenArray[i+1].index : string.length);
    difference = nextIndex - (tokenArray[i].index + tokenArray[i].value.length);

    if(difference > 0){
      badTokens.push({
        value: string.substr((tokenArray[i].index + tokenArray[i].value.length), difference),
        index: tokenArray[i].index + tokenArray[i].value.length
      });
    }
  }

  return badTokens;
}
