import { UserController } from "../src/controllers/user.controller";
import { UserService } from "../src/services/user.service";
import { Request, Response } from "express";

jest.mock("../src/services/user.service");
