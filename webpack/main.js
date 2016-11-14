require(['./clients', './funcao'], function(colecao, minhaFuncao){
    console.log(colecao);
    console.log(minhaFuncao(20,40));
});

/*var colecao = require('./clients');
var minhaFuncao = require('./funcao');

console.log(colecao);
console.log(minhaFuncao(40, 50));*/