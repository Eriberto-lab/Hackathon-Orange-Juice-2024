import { User } from "../models/user.model";
import UserService from "../services/user.service";

import { Request, Response } from "express";

class UserController {
  public static async getAllUsers(_req: Request, res: Response) {
    const user = await UserService.getAllUsers();

    if (!user) {
      return res.status(500);
    }
    return res.status(200).json(user);
  }

  public static async getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const user = await UserService.getUserById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  public static async createUser(req: Request, res: Response) {
    const newUser: User = req.body;
    const createdUser = await UserService.createUser(newUser);
    res.status(201).json(createdUser);
  }
}

export default UserController;
