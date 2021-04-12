(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../pkg/n_pendulum_wasm.js":
/*!*********************************!*\
  !*** ../pkg/n_pendulum_wasm.js ***!
  \*********************************/
/*! exports provided: Pendula, Pendulum, __wbindgen_json_serialize, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./n_pendulum_wasm_bg.wasm */ \"../pkg/n_pendulum_wasm_bg.wasm\");\n/* harmony import */ var _n_pendulum_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./n_pendulum_wasm_bg.js */ \"../pkg/n_pendulum_wasm_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pendula\", function() { return _n_pendulum_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Pendula\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Pendulum\", function() { return _n_pendulum_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Pendulum\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_serialize\", function() { return _n_pendulum_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_json_serialize\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _n_pendulum_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/n_pendulum_wasm.js?");

/***/ }),

/***/ "../pkg/n_pendulum_wasm_bg.js":
/*!************************************!*\
  !*** ../pkg/n_pendulum_wasm_bg.js ***!
  \************************************/
/*! exports provided: Pendula, Pendulum, __wbindgen_json_serialize, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pendula\", function() { return Pendula; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pendulum\", function() { return Pendulum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_json_serialize\", function() { return __wbindgen_json_serialize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./n_pendulum_wasm_bg.wasm */ \"../pkg/n_pendulum_wasm_bg.wasm\");\n\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet WASM_VECTOR_LEN = 0;\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nlet stack_pointer = 32;\n\nfunction addBorrowedObject(obj) {\n    if (stack_pointer == 1) throw new Error('out of js stack');\n    heap[--stack_pointer] = obj;\n    return stack_pointer;\n}\n/**\n*/\nclass Pendula {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Pendula.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_pendula_free\"](ptr);\n    }\n    /**\n    * @param {any} val\n    * @param {number} theta\n    */\n    constructor(val, theta) {\n        try {\n            var ret = _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"pendula_new\"](addBorrowedObject(val), theta);\n            return Pendula.__wrap(ret);\n        } finally {\n            heap[stack_pointer++] = undefined;\n        }\n    }\n    /**\n    * @param {number} dt\n    * @returns {number}\n    */\n    time_step(dt) {\n        var ret = _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"pendula_time_step\"](this.ptr, dt);\n        return ret;\n    }\n}\n/**\n*/\nclass Pendulum {\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_pendulum_free\"](ptr);\n    }\n}\n\nconst __wbindgen_json_serialize = function(arg0, arg1) {\n    const obj = getObject(arg1);\n    var ret = JSON.stringify(obj === undefined ? null : obj);\n    var ptr0 = passStringToWasm0(ret, _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _n_pendulum_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/n_pendulum_wasm_bg.js?");

/***/ }),

/***/ "../pkg/n_pendulum_wasm_bg.wasm":
/*!**************************************!*\
  !*** ../pkg/n_pendulum_wasm_bg.wasm ***!
  \**************************************/
/*! exports provided: memory, __wbg_pendulum_free, __wbg_pendula_free, pendula_new, pendula_time_step, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./n_pendulum_wasm_bg.js */ \"../pkg/n_pendulum_wasm_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/n_pendulum_wasm_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_pendulum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-pendulum */ \"../pkg/n_pendulum_wasm.js\");\n/* harmony import */ var wasm_pendulum_n_pendulum_wasm_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-pendulum/n_pendulum_wasm_bg */ \"../pkg/n_pendulum_wasm_bg.wasm\");\n/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-scale */ \"./node_modules/d3-scale/src/index.js\");\n/* harmony import */ var d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-scale-chromatic */ \"./node_modules/d3-scale-chromatic/src/index.js\");\n\n\n\n\n\nlet ns = [...Array(25).keys()].map(x => x + 1);\nlet nPendulums = ns.length;\n\nconst pendula = new wasm_pendulum__WEBPACK_IMPORTED_MODULE_0__[\"Pendula\"](ns, 0.5*Math.PI);\n\nlet canvas = document.getElementById('canvas');\nlet ctx = canvas.getContext('2d');\n\nvar scale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_2__[\"scaleLinear\"])().domain([0,1]).range([0,200])\nvar color = Object(d3_scale__WEBPACK_IMPORTED_MODULE_2__[\"scaleSequential\"])(d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_3__[\"interpolateRainbow\"]).domain([0, nPendulums]);\n\nconst partialSums = arr => {\n    let s = 0;\n    return arr.map(x => s += x);\n}\nlet nSums = partialSums(ns)\nlet nSum = nSums[nSums.length - 1];\n\nfunction draw() {\n    let coordsPtr = pendula.time_step(1/60);\n    let coordsArray = new Float64Array(wasm_pendulum_n_pendulum_wasm_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer, coordsPtr, 2 * nSum);\n    let pendulumIndex = 0;\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    \n    for (let i = 0; i < nSum; i++) {\n        let x1 = 0.5*canvas.width;\n        let y1 = 0.5*canvas.height;\n        if (i === 0 || nSums.includes(i)) {\n            if (i !== 0) pendulumIndex++;\n            x1 = 0.5*canvas.width;\n            y1 = 0.5*canvas.height;            \n        } else {\n            x1 = 0.5*canvas.width + scale(coordsArray[2*i - 2]);\n            y1 = 0.5*canvas.height + scale(coordsArray[2*i - 1]);\n        }\n        let x2 = 0.5*canvas.width + scale(coordsArray[2*i]);\n        let y2 = 0.5*canvas.height + scale(coordsArray[2*i + 1]);\n        ctx.fillStyle = color(pendulumIndex);\n        ctx.strokeStyle = color(pendulumIndex);\n        ctx.lineWidth = 2;\n        ctx.beginPath();\n        ctx.moveTo(x1, y1);\n        ctx.lineTo(x2, y2);\n        ctx.stroke();\n        ctx.beginPath();\n        ctx.arc(x2, y2, 3, 0, Math.PI * 2, true);\n        ctx.fill();\n    }\n\n    requestAnimationFrame(draw);\n}\n\nrequestAnimationFrame(draw);\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);