"use strict";

window.billPayListComponent = Vue.extend({
    template: "\n    <table cellpadding=\"10\" border=\"1\">\n            <thead>\n            <tr>\n                <th>#</th>\n                <th>Vencimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Paga?</th>\n                <th>A\xE7\xF5es</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr v-for=\"(index,o) in bills\">\n                <td>{{ index + 1 }}</td>\n                <td>{{ o.date_due | dateFormat }}</td>\n                <td>{{ o.name }}</td>\n                <td>{{ o.value | numberFormat 'R$ ' 2 }}</td>\n                <td class=\"minha-classe\" :class=\"{ 'text-green' : o.done, 'text-red' : !o.done }\">\n                    {{ o.done | doneLabel }}\n                </td>\n                <td>\n                    <a v-link=\"{ name : 'bill-pay.update', params: { id : o.id } }\">Editar</a> |\n                    <a href=\"#\" @click.prevent=\"removeBill(o)\">Excluir</a>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    ",
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        removeBill: function removeBill(bill) {
            var _this2 = this;

            if (confirm("Deseja excluir essa despesa?")) {
                Bill.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});