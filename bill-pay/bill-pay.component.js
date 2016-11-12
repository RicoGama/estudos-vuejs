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
    <menu-component></menu-component>
    <router-view></router-view>
    `,
    http: {
        root: 'http://localhost/code_education/estudo-rest/index.php/api'
    },
    data: function () {
        return {
            title: "Contas a pagar",
            status: false
        };
    },
    created: function() {
        this.updateStatus();
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
            var resource = this.$resource('bills{/id}');
            resource.query().then(function (response) {
                this.calculateStatus(response.data);
            });
        }
    },
    events: {
        'change-status' : function() {
            this.updateStatus();
        }
    }
});