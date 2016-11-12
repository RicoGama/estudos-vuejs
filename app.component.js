window.appComponent = Vue.extend({
    components: {
        'menu-component' : menuComponent,
    },
    template: `
    <style type="text/css">
        .minha-classe {
            background-color: burlywood;
        }
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="{ 'text-gray' : status === false, 'text-green' : status === 0, 'text-red' : status > 0 }">{{ status | statusGeneral }}</h3>
    <menu-component></menu-component>
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Contas a pagar",
        };
    },
    computed: {
        status:  function(){
            var bills = this.$root.$children[0].bills;
            if (!bills.length) {
                return false;
            }
            var count = 0;
            for(var i in bills){
                if(!bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    }
});