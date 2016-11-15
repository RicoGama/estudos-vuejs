Vue.http.options.root = 'http://localhost/code_education/estudo-rest/index.php/api';

let BillResource = Vue.resource('bills{/id}', {}, {
    total: {method: 'GET', url: 'bills/total'}
});

export {BillResource};