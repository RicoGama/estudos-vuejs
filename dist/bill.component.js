'use strict';

window.billComponent = Vue.extend({
    template: '\n    <ul :id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n        <li v-for="item in o.items">\n            <a v-link="{ name: item.routeName }">{{ item.name }}</a>\n        </li>\n    </ul>\n    <div class="navbar-fixed">\n        <nav>\n            <div class="nav-wrapper container">\n                <a href="#" class="brand-logo right">Code Contas</a>\n                <a href="#" data-activates="nav-mobile" class="button-collapse">\n                    <i class="material-icons">menu</i>\n                </a>\n                <ul class="left hide-on-med-and-down">\n                    <li v-for="o in menus">\n                        <a v-if="o.dropdownId" class="dropdown-button" href="#" :data-activates="o.dropdownId">\n                            {{ o.name }} <i class="material-icons right">arrow_drop_down</i>\n                        </a>\n                        <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n                    </li>\n                </ul>\n                <ul id="nav-mobile" class="side-nav">\n                    <li v-for="o in menus">\n                        <a v-link="{ name: o.routeName }">{{ o.name }}</a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n    </div>\n    <router-view></router-view>\n    ',
    created: function created() {
        jQuery(document).ready(function () {
            jQuery('.button-collapse').sideNav();
            jQuery('.dropdown-button').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ name: "Contas a pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { name: "Contas a receber", routeName: 'bill-receive', dropdownId: 'bill-receive' }],
            menusDropdown: [{
                id: 'bill-pay', items: [{ id: 0, name: "Listar contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive', items: [{ id: 0, name: "Listar contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]
            }]
        };
    }
});