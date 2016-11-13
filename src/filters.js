Vue.filter('doneLabel', (value) => value == 0 ? "Não paga" : "Paga");

Vue.filter('statusGeneral', (value) => {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar";
    } else {
        return "Existem " + value + " a serem pagas";
    }
});
