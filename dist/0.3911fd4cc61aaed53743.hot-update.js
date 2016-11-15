webpackHotUpdate(0,{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _resources = __webpack_require__(33);
	
	var _modal = __webpack_require__(35);
	
	var _modal2 = _interopRequireDefault(_modal);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    components: {
	        'modal': _modal2.default
	    },
	    template: '\n    <div class="container">\n        <div class="row">\n            <h2>Minhas contas a pagar</h2>\n            <div class="col s12">\n                <table class="bordered striped highlight centered responsive-table">\n                    <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xF5es</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr v-for="(index,o) in bills">\n                            <td>{{ index + 1 }}</td>\n                            <td>{{ o.date_due | dateFormat }}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.value | numberFormat \'R$ \' 2 }}</td>\n                            <td class="white-text" :class="{ \'green lighten-2\' : o.done, \'red lighten-2\' : !o.done }">\n                                {{ o.done | doneLabel }}\n                            </td>\n                            <td>\n                                <a v-link="{ name : \'bill-pay.update\', params: { id : o.id } }">Editar</a> |\n                                <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n    <modal :modal="modal">\n        <div slot="content" v-if="billToDelete">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            <p>Nome: <strong>{{ billToDelete.name }}</strong></p>\n            <p>Valor: <strong>{{ billToDelete.value | numberFormat }}</strong></p>\n            <p>Data de vencimento: <strong>{{ billToDelete.date_due | dateFormat }}</strong></p>\n        </div>\n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close" \n                    @click="removeBill()">OK</button>\n            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n    ',
	    data: function data() {
	        return {
	            bills: [],
	            billToDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;
	
	        _resources.BillResource.query().then(function (response) {
	            _this.bills = response.data;
	        });
	        $(document).ready(function () {
	            $('.modal').modal();
	        });
	    },
	
	    methods: {
	        removeBill: function removeBill() {
	            var _this2 = this;
	
	            _resources.BillResource.delete({ id: this.billToDelete.id }).then(function (response) {
	                _this2.bills.$remove(_this2.billToDelete);
	                _this2.billToDelete = null;
	                Materialize.toast('Conta excluída com sucesso!', 4000);
	                _this2.$dispatch('change-info');
	            });
	        },
	        openModalDelete: function openModalDelete(bill) {
	            this.billToDelete = bill;
	            $('#modal-delete').modal('open');
	        }
	    }
	};

/***/ }

})
//# sourceMappingURL=0.3911fd4cc61aaed53743.hot-update.js.map