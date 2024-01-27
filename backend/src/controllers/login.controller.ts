import { Request, Response } from "express";
import LoginService from "../services/login.service";
import { Login } from "../models/login.model";

class LoginController {
  public static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userLogin: Login = await LoginService.authenticateLogin(email, password);

      if (userLogin) {
        res.json({ message: "Login bem-sucedido.", userLogin });
      } else {
        res.status(401).json({ message: "Credenciais inválidas." });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default LoginController;
