"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpError_1 = __importDefault(require("../util/functions/httpError"));
const key = process.env.JWT_KEY;
const tokenValidator = async (req, res, next) => {
    try {
        const token = req.get("Authorization").split(" ")[2];
        console.log("token ", token);
        if (!token) {
            throw (0, httpError_1.default)("Invalid token");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, key);
        if (!decodedToken) {
            throw (0, httpError_1.default)("Invalid token");
        }
        req.decodedToken = decodedToken;
        console.log("hey", req.decodedToken);
        next();
    }
    catch (err) {
        if (err.error) {
            return res.status(422).json(err);
        }
        return res.status(422).json((0, httpError_1.default)("authentication failed"));
    }
};
exports.default = tokenValidator;
