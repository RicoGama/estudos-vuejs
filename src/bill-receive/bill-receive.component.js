window.billReceiveComponent = Vue.extend({
    /*components: {
        'menu-component' : billPayMenuComponent,
    },*/
    template: `
    <!--<style type="text/css">
        .minha-classe {
            background-color: burlywood;
        }
    </style>-->
    <h1>{{ title }}</h1>
    <!--<h3 :class="{ 'text-gray' : status === false, 'text-green' : status === 0, 'text-red' : status > 0 }">
    {{ status | statusGeneral }}
    </h3>
    <menu-component></menu-component>
    <router-view></router-view>-->
    `,
    data: function () {
        return {
            title: "Contas a receber",
        };
    },
    /*computed: {
        status:  function(){
            var bills = this.$root.$children[0].billsPay;
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
    }*/
});