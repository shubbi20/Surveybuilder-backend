"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function httpError(message) {
    return {
        error: message,
    };
}
exports.default = httpError;
