import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/dtos";
import { AuthRepository } from "../../domain/repositories";
import { CustomError } from "../../domain/errors";
import { RegisterUserImpl } from "../../domain/use-cases";


export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) res.status(400).json({ error });

    new RegisterUserImpl(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))

  }

  loginUser = (req: Request, res: Response) => {
    res.json('loginUser controller');
  }
}
