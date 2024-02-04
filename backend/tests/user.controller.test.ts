import { UserController } from "../src/controllers/user.controller";
import { UserService } from "../src/services/user.service";
import { Request, Response } from "express";

jest.mock("../src/services/user.service");

describe("UserController - getAllUsers", () => {
  it("deve retornar status 200 e lista de usuários sem senhas", async () => {
    // Defina um mock para UserService.getAllUsers retornar usuários simulados
    const mockUsers = [
      { id: 1, name: "Usuário 1", email: "usuario1@email.com", password: "senha123" },
      { id: 2, name: "Usuário 2", email: "usuario2@email.com", password: "senha456" },
    ];

    // Configura o mock para retornar a lista simulada de usuários
    (UserService.getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    // Configura mocks para Request e Response
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Executa o método do controller
    await UserController.getAllUsers(mockRequest as Request, mockResponse as Response);

    // Verifica se o status 200 foi chamado
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Verifica se o método json foi chamado com a lista de usuários sem senhas
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, name: "Usuário 1", email: "usuario1@email.com" },
      { id: 2, name: "Usuário 2", email: "usuario2@email.com" },
    ]);
  });
});
