import './bootstrap';
import BillPayComponent from './bill-pay/bill-pay.component';
import BillPayListComponent from './bill-pay/bill-pay-list.component';
import BillPayCreateComponent from './bill-pay/bill-pay-create.component';
import BillReceiveComponent from './bill-receive/bill-receive.component';
import BillComponent from './Bill.vue';

let VueRouter = require('vue-router');
let router = new VueRouter();
router.map({
    '/bill-pays' : {
        component: BillPayComponent,
        subRoutes: {
            '/' : {
                name: 'bill-pay.list',
                component: BillPayListComponent
            },
            '/create' : {
                name: 'bill-pay.create',
                component: BillPayCreateComponent
            },
            '/:id/update' : {
                name: 'bill-pay.update',
                component: BillPayCreateComponent
            },
            '*': {
                component: BillPayListComponent
            }
        }
    },
    'bill-receives' : {
        name: 'bill-receive',
        component: BillReceiveComponent
    },
    '*': {
        component: BillPayListComponent
    }
});

router.start({
    components: {
        'bill-component': BillComponent
    }
}, '#app');

router.redirect({
    '*': '/bill-pays'
});