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

Vue.filter('numberFormat', {
    read(value) {
        var number = 0;
        if (value && typeof value !== undefined) {
            number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || 0;
        }
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximoFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d,]/g, '')
                .replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});
