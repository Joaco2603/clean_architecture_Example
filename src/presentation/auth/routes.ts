import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl } from "../../infraestructure/datasources";
import { AuthRepositoryImpl } from "../../infraestructure/repositories";
import { BcryptAdapter } from "../../config";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl(BcryptAdapter.generateHash, BcryptAdapter.compareHash);
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    return router;
  }
}
