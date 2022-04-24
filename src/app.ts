import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";

const port = 3009;
const app = express();

// mongoose.connect(mongo "mongodb+srv://shubham0.4cnas.mongodb.net/myFirstDatabase" --username shubhammongodb)
//process.env.DATABASE
//mongodb+srv://userName:Paasword@cluster0.dimbv.mongodb.net/ecomDB    { useNewUrlParser: false }

mongoose.connect(
  "mongodb+srv://shubham0.4cnas.mongodb.net/Shubham0",
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

app.get("/", (_req, res) => {
  res.end("Hello World!");
});

app.listen(port, () => {
  console.log("hello");
});
