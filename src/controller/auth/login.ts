import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../../models/auth.js";
import httpError from "../../util/functions/httpError";
import authModel from "../../models/auth.js";

const JWT_KEY: any = process.env.JWT_KEY;

const login = async (req: any, res: any) => {
  try {
    // extract inputs
    const { username, password } = req.body;

    // check for user exists
    const existingUser = await authModel.findOne({ username });

    // user does not exists
    if (!existingUser) {
      throw httpError("user does not exists");
    }

    // comparing password
    const isValidPassword = await bcrypt
      .compare(password, existingUser.password)
      .catch(() => {
        throw httpError("Validation failed");
      });

    // invalid password
    if (!isValidPassword) {
      throw httpError("invalid credentials");
    }

    // generate token
    const token = jwt.sign(
      {
        username: existingUser.username,
      },
      JWT_KEY,
      { expiresIn: "3h" }
    );

    // send response
    res.send({
      username: existingUser.username,
      token: token,
    });
  } catch (err: any) {
    console.log(err);
    if (err.error) {
      return res.status(422).send(err);
    }
    res.statu(422).send(httpError("Login failed"));
  }
};

export default login;
