import { RegisterUserDto } from "../dtos";
import { UserEntity } from "../entities";


export abstract class AuthDatasource {

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

}
