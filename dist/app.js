"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const survey_1 = __importDefault(require("./routes/survey"));
const auth_1 = __importDefault(require("./routes/auth"));
const port = 3009;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const app = (0, express_1.default)();
// mongoose.connect(mongo "mongodb+srv://shubham0.4cnas.mongodb.net/myFirstDatabase" --username shubhammongodb)
//process.env.DATABASE
//mongodb+srv://userName:Paasword@cluster0.dimbv.mongodb.net/ecomDB    { useNewUrlParser: false }
// mongodb+srv://shubham0.4cnas.mongodb.net/Shubham0
// mongodb://localhost:27017/surveyRocketo
mongoose_1.default.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@shubham0.4cnas.mongodb.net/${DB_NAME}`, { useNewUrlParser: true }, (err) => {
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
// bodyparser
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/", (_req, res) => {
    res.end("Hello World!");
});
app.use("/", auth_1.default);
app.use("/", survey_1.default);
app.listen(port, () => {
    console.log("hello");
});
