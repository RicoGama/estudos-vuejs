window.billListComponent = Vue.extend({
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
    </style>
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
                    <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                    <a href="#" @click.prevent="removeBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].bills
        };
    },
    methods: {
        loadBill: function (bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-formtype', 'update');
        },
        removeBill: function(bill) {
            if (confirm("Deseja excluir essa despesa?")) {
                this.bills.$remove(bill);
            }
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});