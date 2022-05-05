"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("../controller/auth/signup"));
const login_1 = __importDefault(require("../controller/auth/login"));
const router = (0, express_1.Router)();
router.post("/signup", signup_1.default);
router.post("/login", login_1.default);
exports.default = router;
