import { AuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";


export class AuthDatasourceImpl implements AuthDatasource {


  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {



      return new UserEntity(
        '1',
        name,
        email,
        password,
        ['ADMIN_ROLES']
      )


    } catch (error) {

      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();

    }
  }


}
