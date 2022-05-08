import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../../models/auth";
import httpError from "../../util/functions/httpError.js";
import userModel from "../../models/user";
import authModel from "../../models/auth";

const JWT_KEY: any = process.env.JWT_KEY;

const saltRounds = 12;

const signup = async (req: any, res: any) => {
  try {
    const { name, username, email, age, mobile, password } = req.body;

    //   check for existing user
    const existingUser = await authModel.findOne({ username });

    //   if user exists
    if (existingUser) {
      throw httpError("UserName already Exists");
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create Auth
    const createdAuth = new authModel({
      username,
      password: hashedPassword,
    });

    // create new User
    const createdUser = new userModel({
      name,
      username,
      email,
      age,
      mobile,
    });

    //   store to database
    await createdUser.save().catch((err: any) => {
      console.log(err);
      throw httpError("Invalid User Details");
    });

    await createdAuth.save().catch((err: any) => {
      console.log(err);
      throw httpError("Invalid Auth Details");
    });

    //   generate JWT token
    const token = jwt.sign(
      {
        username: createdUser.username,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );

    //  send response back
    res.send({
      username: createdUser.username,
      token: token,
    });
  } catch (err: any) {
    console.log(err);
    if (err.error) {
      return res.send(err);
    }
    res.send(httpError("Signup failed"));
  }
};

export default signup;
