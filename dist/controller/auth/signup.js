"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpError_js_1 = __importDefault(require("../../util/functions/httpError.js"));
const user_1 = __importDefault(require("../../models/user"));
const auth_1 = __importDefault(require("../../models/auth"));
const JWT_KEY = process.env.JWT_KEY;
const saltRounds = 12;
const signup = async (req, res) => {
    try {
        const { name, username, email, age, mobile, password } = req.body;
        //   check for existing user
        const existingUser = await auth_1.default.findOne({ username });
        //   if user exists
        if (existingUser) {
            throw (0, httpError_js_1.default)("UserName already Exists");
        }
        // hash password before saving
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        // create Auth
        const createdAuth = new auth_1.default({
            username,
            password: hashedPassword,
        });
        // create new User
        const createdUser = new user_1.default({
            name,
            username,
            email,
            age,
            mobile,
        });
        //   store to database
        await createdUser.save().catch((err) => {
            console.log(err);
            throw (0, httpError_js_1.default)("Invalid User Details");
        });
        await createdAuth.save().catch((err) => {
            console.log(err);
            throw (0, httpError_js_1.default)("Invalid Auth Details");
        });
        //   generate JWT token
        const token = jsonwebtoken_1.default.sign({
            username: createdUser.username,
        }, JWT_KEY, { expiresIn: "1h" });
        //  send response back
        res.send({
            username: createdUser.username,
            token: token,
        });
    }
    catch (err) {
        console.log(err);
        if (err.error) {
            return res.send(err);
        }
        res.send((0, httpError_js_1.default)("Signup failed"));
    }
};
exports.default = signup;
