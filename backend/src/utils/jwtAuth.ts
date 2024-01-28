import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET || "senhasecreta";

const CONFIG: SignOptions = {
  expiresIn: "1d",
  algorithm: "HS256",
};

export const generateToken = (payload: any): string => {
  const token: string = jwt.sign(payload, secretKey, CONFIG);
  return token;
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secretKey);
};
