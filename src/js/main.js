require('./bootstrap');
require([
    './bill-pay/bill-pay.component',
    './bill-pay/bill-pay-list.component',
    './bill-pay/bill-pay-create.component',
    './bill-receive/bill-receive.component',
    './bill.component'
    ],
    function(billPayComponent,
             billPayListComponent,
             billPayCreateComponent,
             billReceiveComponent,
             billComponent
    ){
    let VueRouter = require('vue-router');
    let router = new VueRouter();
    router.map({
        '/bill-pays' : {
            component: billPayComponent,
            subRoutes: {
                '/' : {
                    name: 'bill-pay.list',
                    component: billPayListComponent
                },
                '/create' : {
                    name: 'bill-pay.create',
                    component: billPayCreateComponent
                },
                '/:id/update' : {
                    name: 'bill-pay.update',
                    component: billPayCreateComponent
                },
                '*': {
                    component: billPayListComponent
                }
            }
        },
        'bill-receives' : {
            name: 'bill-receive',
            component: billReceiveComponent
        },
        '*': {
            component: billPayListComponent
        }
    });

    router.start({
        components: {
            'bill-component': billComponent
        }
    }, '#app');

    router.redirect({
        '*': '/bills-pays'
    });
});