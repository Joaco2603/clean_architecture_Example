import { AuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories";


export class AuthRepositoryImpl implements AuthRepository {


  constructor(
    private readonly authDatasource: AuthDatasource,
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }

}
