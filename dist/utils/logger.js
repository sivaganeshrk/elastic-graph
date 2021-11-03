"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = void 0;
var enable = true;
function debug(module, message) {
    if (enable) {
        console.debug(JSON.stringify({ module: module, message: message }));
    }
}
exports.debug = debug;
