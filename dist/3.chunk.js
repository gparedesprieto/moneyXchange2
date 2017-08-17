webpackJsonpac__name_([3],{

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChildDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(5);


/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */
console.log('`ChildDetail` component loaded asynchronously');
var ChildDetailComponent = (function () {
    function ChildDetailComponent() {
    }
    ChildDetailComponent.prototype.ngOnInit = function () {
        console.log('hello `ChildDetail` component');
    };
    return ChildDetailComponent;
}());
ChildDetailComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'child-detail',
        template: "\n    <h1>Hello from Child Detail</h1>    \n  ",
    })
], ChildDetailComponent);



/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__child_detail_module__ = __webpack_require__(396);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChildDetailModule", function() { return __WEBPACK_IMPORTED_MODULE_0__child_detail_module__["a"]; });



/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChildDetailModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__child_detail_routes__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__child_detail_component__ = __webpack_require__(390);







console.log('`ChildDetail` bundle loaded asynchronously');
var ChildDetailModule = (function () {
    function ChildDetailModule() {
    }
    return ChildDetailModule;
}());
ChildDetailModule.routes = __WEBPACK_IMPORTED_MODULE_5__child_detail_routes__["a" /* routes */];
ChildDetailModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        declarations: [
            /**
             * Components / Directives/ Pipes
             */
            __WEBPACK_IMPORTED_MODULE_6__child_detail_component__["a" /* ChildDetailComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__child_detail_routes__["a" /* routes */]),
        ],
    })
], ChildDetailModule);



/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__child_detail_component__ = __webpack_require__(390);

var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__child_detail_component__["a" /* ChildDetailComponent */], pathMatch: 'full' },
];


/***/ })

});
//# sourceMappingURL=3.chunk.js.map