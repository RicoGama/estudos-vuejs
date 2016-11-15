import {BillResource} from '../resources';
import ModalComponent from '../modal.component';

export default {
    components :{
        'modal': ModalComponent
    },
    template: `
    <div class="container">
        <div class="row">
            <h2>Minhas contas a pagar</h2>
            <div class="col s12">
                <table class="bordered striped highlight centered responsive-table">
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
                            <td>{{ o.date_due | dateFormat }}</td>
                            <td>{{ o.name }}</td>
                            <td>{{ o.value | numberFormat 'R$ ' 2 }}</td>
                            <td class="white-text" :class="{ 'green lighten-2' : o.done, 'red lighten-2' : !o.done }">
                                {{ o.done | doneLabel }}
                            </td>
                            <td>
                                <a v-link="{ name : 'bill-pay.update', params: { id : o.id } }">Editar</a> |
                                <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <modal :modal="modal">
        <div slot="content" v-if="billToDelete">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{ billToDelete.name }}</strong></p>
            <p>Valor: <strong>{{ billToDelete.value | numberFormat }}</strong></p>
            <p>Data de vencimento: <strong>{{ billToDelete.date_due | dateFormat }}</strong></p>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close" 
                    @click="removeBill()">OK</button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>
    `,
    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            },
        };
    },
    created() {
        BillResource.query().then((response) => {
            this.bills = response.data;
        });
        $(document).ready(function(){
            $('.modal').modal();
        });
    },
    methods: {
        removeBill() {
            BillResource.delete({id : this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso!', 4000);
                this.$dispatch('change-info');
            });
        },
        openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
};