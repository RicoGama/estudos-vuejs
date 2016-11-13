"use strict";

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não paga" : "Paga";
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar";
    } else {
        return "Existem " + value + " a serem pagas";
    }
});