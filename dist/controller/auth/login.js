"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpError_1 = __importDefault(require("../../util/functions/httpError"));
const auth_js_1 = __importDefault(require("../../models/auth.js"));
const JWT_KEY = process.env.JWT_KEY;
const login = async (req, res) => {
    try {
        // extract inputs
        const { username, password } = req.body;
        // check for user exists
        const existingUser = await auth_js_1.default.findOne({ username });
        // user does not exists
        if (!existingUser) {
            throw (0, httpError_1.default)("user does not exists");
        }
        // comparing password
        const isValidPassword = await bcryptjs_1.default
            .compare(password, existingUser.password)
            .catch(() => {
            throw (0, httpError_1.default)("Validation failed");
        });
        // invalid password
        if (!isValidPassword) {
            throw (0, httpError_1.default)("invalid credentials");
        }
        // generate token
        const token = jsonwebtoken_1.default.sign({
            username: existingUser.username,
        }, JWT_KEY, { expiresIn: "1h" });
        // send response
        res.send({
            username: existingUser.username,
            token: token,
        });
    }
    catch (err) {
        console.log(err);
        if (err.error) {
            return res.send(err);
        }
        res.send((0, httpError_1.default)("Login failed"));
    }
};
exports.default = login;
