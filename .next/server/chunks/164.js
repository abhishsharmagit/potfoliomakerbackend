"use strict";
exports.id = 164;
exports.ids = [164];
exports.modules = {

/***/ 1878:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2783);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_user__WEBPACK_IMPORTED_MODULE_0__]);
_user__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];


});

/***/ }),

/***/ 2783:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9915);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([js_cookie__WEBPACK_IMPORTED_MODULE_1__]);
js_cookie__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];


const getMe = async (token)=>{
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const user = await axios__WEBPACK_IMPORTED_MODULE_0___default()(`${"https://nestdeploying.herokuapp.com/"}/me`, config);
    return user.data;
};
const createPortfolio = async (dto)=>{
    const token = getToken();
    console.log(token, "token");
    const config = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: dto
    };
    const user = await axios__WEBPACK_IMPORTED_MODULE_0___default()(`${"https://nestdeploying.herokuapp.com/"}/create`, config);
    return user.data;
};
const getToken = ()=>{
    return js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].get("token");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    getMe,
    createPortfolio,
    getToken
});

});

/***/ }),

/***/ 1164:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ getMe),
/* harmony export */   "J": () => (/* binding */ createPortfolio)
/* harmony export */ });
/* harmony import */ var _slice_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4404);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1878);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_service__WEBPACK_IMPORTED_MODULE_1__]);
_service__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];


const getMe = (token)=>async (dispatch)=>{
        try {
            console.log("thunk");
            const user = await _service__WEBPACK_IMPORTED_MODULE_1__/* .userService.getMe */ .W.getMe(token);
            console.log("user", user);
            dispatch((0,_slice_user__WEBPACK_IMPORTED_MODULE_0__/* .fetchUserByIdSuccess */ .Ih)(user));
        } catch (error) {
        //todo : handle this error
        }
    }
;
const createPortfolio = (dto)=>async (dispatch)=>{
        try {
            const portfolio = await _service__WEBPACK_IMPORTED_MODULE_1__/* .userService.createPortfolio */ .W.createPortfolio(dto);
            console.log(portfolio, "portfolio");
            dispatch((0,_slice_user__WEBPACK_IMPORTED_MODULE_0__/* .createPortfolioSuccess */ .pz)(portfolio));
        } catch (error) {
        //todo : handle this error
        }
    }
;

});

/***/ })

};
;