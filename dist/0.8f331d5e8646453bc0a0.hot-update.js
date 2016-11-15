webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _billPay = __webpack_require__(32);
	
	var _billPay2 = _interopRequireDefault(_billPay);
	
	var _billPayList = __webpack_require__(34);
	
	var _billPayList2 = _interopRequireDefault(_billPayList);
	
	var _billPayCreate = __webpack_require__(36);
	
	var _billPayCreate2 = _interopRequireDefault(_billPayCreate);
	
	var _billReceive = __webpack_require__(38);
	
	var _billReceive2 = _interopRequireDefault(_billReceive);
	
	var _bill = __webpack_require__(39);
	
	var _bill2 = _interopRequireDefault(_bill);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VueRouter = __webpack_require__(40);
	var router = new VueRouter();
	router.map({
	    '/bill-pays': {
	        component: _billPay2.default,
	        subRoutes: {
	            '/': {
	                name: 'bill-pay.list',
	                component: _billPayList2.default
	            },
	            '/create': {
	                name: 'bill-pay.create',
	                component: _billPayCreate2.default
	            },
	            '/:id/update': {
	                name: 'bill-pay.update',
	                component: _billPayCreate2.default
	            },
	            '*': {
	                component: _billPayList2.default
	            }
	        }
	    },
	    'bill-receives': {
	        name: 'bill-receive',
	        component: _billReceive2.default
	    },
	    '*': {
	        component: _billPayList2.default
	    }
	});
	
	router.start({
	    components: {
	        'bill-component': _bill2.default
	    }
	}, '#app');
	
	router.redirect({
	    '*': '/bill-pays'
	});

/***/ }
])
//# sourceMappingURL=0.8f331d5e8646453bc0a0.hot-update.js.map