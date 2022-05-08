import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import httpError from "../util/functions/httpError";

const key: any = process.env.JWT_KEY;

const tokenValidator = async (req: any, res: any, next: any) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    console.log("token ", token);
    if (!token) {
      throw httpError("Invalid token");
    }
    const decodedToken = jwt.verify(token, key);
    if (!decodedToken) {
      throw httpError("Invalid token");
    }
    req.decodedToken = decodedToken;
    console.log("hey", req.decodedToken);
    next();
  } catch (err: any) {
    if (err.error) {
      return res.status(422).json(err);
    }
    return res.status(422).json(httpError("authentication failed"));
  }
};

export default tokenValidator;
