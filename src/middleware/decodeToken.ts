import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import httpError from "../util/functions/httpError";

const key: any = process.env.JWT_KEY;

const validator = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw httpError("Invalid token");
    }
    const decodedToken = jwt.verify(token, key);
    if (!decodedToken) {
      throw httpError("Invalid token");
    }
    req.decodedToken = decodedToken;
    next();
  } catch (err: any) {
    if (err.error) {
      return res.status(422).json(err);
    }
    return res.status(422).json(httpError("authentication failed"));
  }
};

export default validator;
