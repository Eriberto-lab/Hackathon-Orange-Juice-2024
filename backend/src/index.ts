import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Importe o pacote cors
import userRouter from "./routers/user.router";
import projectRouter from "./routers/project.router";
import { multerMiddleware } from "./middlewares/fileParser";
import loginRouter from "./routers/login.router";

dotenv.config();

const app = express();

app.use(cors()); // Use o middleware cors
app.use(express.json());
app.use(multerMiddleware);

app.listen(process.env.PORT, () => console.log(`Express rodando na porta ${process.env.PORT}`));

app.use(loginRouter);
app.use(userRouter);
app.use(projectRouter);
