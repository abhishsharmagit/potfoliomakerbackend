"use strict";
exports.id = 162;
exports.ids = [162];
exports.modules = {

/***/ 6162:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "n": () => (/* binding */ makeStore),
  "TL": () => (/* binding */ useAppDispatch),
  "CG": () => (/* binding */ useAppSelector)
});

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/slice/user.ts
var user = __webpack_require__(4404);
;// CONCATENATED MODULE: ./src/store/rootReducer.ts


/* harmony default export */ const rootReducer = ((0,toolkit_.combineReducers)({
    user: user/* reducer */.I6
}));

;// CONCATENATED MODULE: ./src/store/index.ts



const useAppSelector = external_react_redux_.useSelector;
const store = (0,toolkit_.configureStore)({
    reducer: rootReducer
});
const useAppDispatch = ()=>(0,external_react_redux_.useDispatch)()
;
//@ts-ignore
const makeStore = (_context)=>(0,toolkit_.configureStore)({
        reducer: rootReducer
    })
;


/***/ }),

/***/ 4404:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I6": () => (/* binding */ reducer),
/* harmony export */   "Ih": () => (/* binding */ fetchUserByIdSuccess),
/* harmony export */   "pz": () => (/* binding */ createPortfolioSuccess)
/* harmony export */ });
/* unused harmony export clearUserState */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    entities: {
    },
    portfolioUrl: '',
    loading: "idle"
};
const usersSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "user",
    initialState,
    reducers: {
        fetchUserByIdSuccess: (state, { payload  })=>{
            console.log(payload, 'payload');
            //@ts-ignore
            state.entities[payload.id] = payload;
        },
        createPortfolioSuccess: (state, { payload  })=>{
            console.log(payload, 'payload');
            state.portfolioUrl = payload;
        },
        clearUserState: ()=>{
            return initialState;
        }
    }
});
const reducer = usersSlice.reducer;
const { fetchUserByIdSuccess , clearUserState , createPortfolioSuccess  } = usersSlice.actions;


/***/ })

};
;