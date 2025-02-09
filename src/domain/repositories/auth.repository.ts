import { RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities";


export abstract class AuthRepository {

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}
