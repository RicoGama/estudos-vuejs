Vue.filter('doneLabel', function (value) {
    if (value == '0') {
        return 'Não paga';
    } else {
        return 'Paga';
    }
});

Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return "Nenhuma conta cadastrada";
    }

    if (!value) {
        return "Nenhuma conta a pagar";
    } else {
        return "Existem " + value + " a serem pagas";
    }
});

var appComponent = Vue.extend({
    template: `
    <h1>{{ title }}</h1>
    <h3 :class="{ 'text-gray' : status === false, 'text-green' : status === 0, 'text-red' : status > 0 }">{{ status | statusGeneral }}</h3>
    <nav>
        <ul>
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
            </li>
        </ul>
    </nav>
    <div v-if="activedView == 0">
        <table cellpadding="10" border="1">
            <thead>
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,o) in bills">
                <td>{{ index + 1 }}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2 }}</td>
                <td :class="{ 'text-green' : o.done, 'text-red' : !o.done }">
                    {{ o.done | doneLabel }}
                </td>
                <td>
                    <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                    <a href="#" @click.prevent="removeBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div v-if="activedView == 1">
        <form name="form" @submit.prevent="submit">
            <label>Vencimento: </label>
            <input type="text" v-model="bill.date_due" />
            <br /><br />
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="o in names" :value="o">{{ o }}</option>
            </select>
            <br /><br />
            <label>Valor:</label>
            <input type="text" v-model="bill.value" />
            <br /><br />
            <input type="checkbox" v-model="bill.done" /> Pago
            <br /><br />
            <input type="submit" value="Enviar" />
        </form>
    </div>
    `,
    data: function () {
        return {
            test: '',
            title: "Contas a pagar",
            menus: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"}
            ],
            activedView: 0,
            formType: 'insert',
            bill: {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            },
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina',
            ],
            bills: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: false},
            ]
        };
    },
    computed: {
        status:  function(){
            if (this.bills.length) {
                return false;
            }
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id;
            if (id == 1) {
                this.formType = 'insert';
            }
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill = {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update'
        },
        removeBill: function(bill) {
            if (confirm("Deseja excluir essa despesa?")) {
                this.bills.$remove(bill);
            }
        }
    }
});

Vue.component('app-component', appComponent);

var app = new Vue({
    el: "#app",
});