window.billPayCreateComponent = Vue.extend({
    template: `
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
    `,
    http: {
        root: 'http://localhost/code_education/estudo-rest/index.php/api'
    },
    data: function () {
        return {
            formType: 'insert',
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina',
            ],
            bill: {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            }
        };
    },
    created: function () {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function () {
            var resource = this.$resource('bills{/id}');
            if (this.formType == 'insert') {
                resource.save({},this.bill).then(function (response) {
                    this.$dispatch('change-status');
                    this.$router.go({
                        name: 'bill-pay.list'
                    });
                });
            } else {
                resource.update({id : this.bill.id}, this.bill).then(function (response) {
                    this.$dispatch('change-status');
                    this.$router.go({
                        name: 'bill-pay.list'
                    });
                });
            }
        },
        getBill: function (id) {
            var resource = this.$resource('bills{/id}');
            resource.get({id : id}).then(function (response) {
                this.bill = response.data;
            });
        }
    }
});