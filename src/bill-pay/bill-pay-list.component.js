window.billPayListComponent = Vue.extend({
    template: `
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
                <td class="minha-classe" :class="{ 'text-green' : o.done, 'text-red' : !o.done }">
                    {{ o.done | doneLabel }}
                </td>
                <td>
                    <a v-link="{ name : 'bill-pay.update', params: { id : o.id } }">Editar</a> |
                    <a href="#" @click.prevent="removeBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data() {
        return {
            bills: []
        };
    },
    created() {
        Bill.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        removeBill(bill) {
            if (confirm("Deseja excluir essa despesa?")) {
                Bill.delete({id : bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});