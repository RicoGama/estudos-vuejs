window.billPayComponent = Vue.extend({
    components: {
        'menu-component' : billPayMenuComponent,
    },
    template: `
    <style type="text/css">
        .text-green {
            color: green;
        }
        .text-red {
            color: red;
        }
        .text-gray {
            color: gray;
        }
        .minha-classe {
            background-color: burlywood;
        }
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="{ 'text-gray' : status === false, 'text-green' : status === 0, 'text-red' : status > 0 }">{{ status | statusGeneral }}</h3>
    <h3> {{ total | currency 'R$ ' }}</h3>
    <menu-component></menu-component>
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created: function() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function (bills) {
            if (!bills.length) {
                this.status = false;
            }
            var count = 0;
            for(var i in bills){
                if(!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            var self = this;
            Bill.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function () {
            var self = this;
            Bill.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info' : function() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});