import { UserModel } from "../../data/mongodb/models";
import { AuthDatasource } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { UserMapper } from "../mappers";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction,
    private readonly comparePassword: CompareFunction
  ) { }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {

      const emailExists = await UserModel.findOne(({ email: email }));

      if (emailExists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password)
      });

      await user.save();


      return UserMapper.userEntityFromObject(user);
    } catch (error) {

      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();

    }
  }

}
