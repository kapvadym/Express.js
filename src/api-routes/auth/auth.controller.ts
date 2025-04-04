import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "./auth.service"; 
import { config } from "../../config/index";
import { Auth } from "./auth.model";

const SECRET_KEY = config.key as string

interface IRegister {
  email: string;
  password: string;
  username: string;
}

interface ILogin {
  email: string;
  password: string;
}

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password, username }: IRegister = req.body;
    const account = await registerUser(email, password, username);

    const token = jwt.sign(
      {
        _id: account._id
      },
      SECRET_KEY,
      {
        expiresIn: "30d"
      }
    );

    res.status(201).json({
      status: "success",
      token
    })

  } catch (error) {
    res.status(400).json({
      message: "register error",
      error
    })
  }
}

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password }: ILogin = req.body;
    const account = await loginUser(email, password)

    const token = jwt.sign(
      {
        _id: account._id
      },
      SECRET_KEY,
      {
        expiresIn: "30d"
      }
    );

    res.status(200).json({
      status: "success",
      token
    });
  } catch (error) {
    res.status(400).json({
      message: "login error",
      error
    });
  }
}