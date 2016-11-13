'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n    <style type="text/css">\n        .text-green {\n            color: green;\n        }\n        .text-red {\n            color: red;\n        }\n        .text-gray {\n            color: gray;\n        }\n        .minha-classe {\n            background-color: burlywood;\n        }\n    </style>\n    <div class="section">\n        <div class="container">\n            <h1>{{ title }}</h1>\n            <h3 :class="{ \'text-gray\' : status === false, \'text-green\' : status === 0, \'text-red\' : status > 0 }">\n                {{ status | statusGeneral }}\n            </h3>\n            <div class="row">\n                <div class="col s5 offset-s7">\n                    <h3> {{ total | numberFormat }}</h3>\n                </div>\n            </div>\n            <menu-component></menu-component>\n            <router-view></router-view>\n        </div>\n    </div>\n    ',
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
            var _this = this;

            Bill.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bill.total().then(function (response) {
                _this2.total = response.data.total;
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