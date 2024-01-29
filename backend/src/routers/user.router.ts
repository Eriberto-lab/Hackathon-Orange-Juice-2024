import UserController from "../controllers/user.controller";
import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/users", UserController.createUser);

userRouter.get("/users", authenticateMiddleware, UserController.getAllUsers);
userRouter.get("/users/:id", authenticateMiddleware, UserController.getUserById);
userRouter.delete("/users/:id", authenticateMiddleware, UserController.deleteUser);
userRouter.put("/users/:id", authenticateMiddleware, UserController.updateUser);

export default userRouter;
