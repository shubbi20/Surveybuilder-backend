import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/survey";
import AuthRouter from "./routes/auth";

const port = process.env.PORT || 3009;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const app = express();

// mongoose.connect(mongo "mongodb+srv://shubham0.4cnas.mongodb.net/myFirstDatabase" --username shubhammongodb)
//process.env.DATABASE
//mongodb+srv://userName:Paasword@cluster0.dimbv.mongodb.net/ecomDB    { useNewUrlParser: false }

// mongodb+srv://shubham0.4cnas.mongodb.net/Shubham0
// mongodb://localhost:27017/surveyRocketo

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@shubham0.4cnas.mongodb.net/${DB_NAME}`,
  { useNewUrlParser: true } as ConnectOptions,
  (err) => {
    if (err) {
      console.log("Database not connected" + err);
    } else {
      console.log("Database connected");
    }
  }
);

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

app.use(cors());

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.end("Hello World!");
});

app.use("/", AuthRouter);
app.use("/", router);

app.listen(port, () => {
  console.log("hello");
});
