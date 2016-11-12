'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n    <style type="text/css">\n        .text-green {\n            color: green;\n        }\n        .text-red {\n            color: red;\n        }\n        .text-gray {\n            color: gray;\n        }\n        .minha-classe {\n            background-color: burlywood;\n        }\n    </style>\n    <h1>{{ title }}</h1>\n    <h3 :class="{ \'text-gray\' : status === false, \'text-green\' : status === 0, \'text-red\' : status > 0 }">{{ status | statusGeneral }}</h3>\n    <h3> {{ total | currency \'R$ \' }}</h3>\n    <menu-component></menu-component>\n    <router-view></router-view>\n    ',
    data: function data() {
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var self = this;
            Bill.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            Bill.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});