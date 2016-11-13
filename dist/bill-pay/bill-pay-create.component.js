'use strict';

var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
    template: '\n    <form name="form" @submit.prevent="submit">\n        <label>Vencimento: </label>\n        <input type="text" v-model="bill.date_due" />\n        <br /><br />\n        <label>Nome:</label>\n        <select v-model="bill.name">\n            <option v-for="o in names" :value="o">{{ o }}</option>\n        </select>\n        <br /><br />\n        <label>Valor:</label>\n        <input type="text" v-model="bill.value | numberFormat" />\n        <br /><br />\n        <input type="checkbox" v-model="bill.done" /> Pago\n        <br /><br />\n        <input type="submit" value="Enviar" />\n    </form>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bill: {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            if (this.formType == 'insert') {
                Bill.save({}, this.bill).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({
                        name: 'bill-pay.list'
                    });
                });
            } else {
                Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({
                        name: 'bill-pay.list'
                    });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            Bill.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
            });
        }
    }
});