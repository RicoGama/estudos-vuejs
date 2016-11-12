"use strict";

window.billReceiveComponent = Vue.extend({
    /*components: {
        'menu-component' : billPayMenuComponent,
    },*/
    template: "\n    <!--<style type=\"text/css\">\n        .minha-classe {\n            background-color: burlywood;\n        }\n    </style>-->\n    <h1>{{ title }}</h1>\n    <!--<h3 :class=\"{ 'text-gray' : status === false, 'text-green' : status === 0, 'text-red' : status > 0 }\">\n    {{ status | statusGeneral }}\n    </h3>\n    <menu-component></menu-component>\n    <router-view></router-view>-->\n    ",
    data: function data() {
        return {
            title: "Contas a receber"
        };
    }
});