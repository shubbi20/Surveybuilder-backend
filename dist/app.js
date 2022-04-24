"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3009;
const app = (0, express_1.default)();
// mongoose.connect(mongo "mongodb+srv://shubham0.4cnas.mongodb.net/myFirstDatabase" --username shubhammongodb)
//process.env.DATABASE
//mongodb+srv://userName:Paasword@cluster0.dimbv.mongodb.net/ecomDB    { useNewUrlParser: false }
mongoose_1.default.connect("mongodb+srv://shubham0.4cnas.mongodb.net/Shubham0", { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("Database not connected" + err);
    }
    else {
        console.log("Database connected");
    }
});
// mongoose.connect(
//   "mongodb+srv://shubhammongodb:Shubhammongodb123@cluster0.dimbv.mongodb.net/ecomDB",{ useNewUrlParser: true },
//   (err) => {
//     if (err) {
//       console.log("Database not connected");
//     } else {
//       console.log("Database connected");
//     }
//   }
// );
app.get("/", (_req, res) => {
    res.end("Hello World!");
});
app.listen(port, () => {
    console.log("hello");
});
