import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<any>;
}


type SignTokenFunction = (payload: Object, duration?: number) => Promise<string | null>;

export class RegisterUserImpl implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignTokenFunction = JwtAdapter.generateToken,
  ) { }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

    const user = await this.authRepository.register(registerUserDto);

    const token = await this.signToken({ id: user.id }, 2);
    if (!token) throw CustomError.internalServer('Error generating token');


    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }

  }

}
