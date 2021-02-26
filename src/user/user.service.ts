import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/createAccount.dto';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dtos/deleteAccount.dto';
import { GetUserByIdInput, GetUserByIdOutput } from './dtos/getUserById.dto';
import { LogInInput, LogInOuput } from './dtos/login.dto';
import {
  UpdateProfileInput,
  UpdateProfileOutput,
} from './dtos/updateProfile.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async createAccount(input: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const { email, phoneNumber } = input;
      const user = await this.users.findOne({
        where: [{ email }, { phoneNumber }],
      });
      if (user) {
        return {
          ok: false,
          error: 'Already exist user error',
        };
      }
      const newUser = this.users.create({ ...input });
      await this.users.save(newUser);
      return {
        ok: true,
        user: newUser,
      };
    } catch (error) {
      console.log(`Error on CreateAccount : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }

  async logIn(input: LogInInput): Promise<LogInOuput> {
    try {
      const { email, phoneNumber } = input;
      let user = await this.users.findOne({
        where: [{ email, phoneNumber }],
      });
      if (!user) {
        const {
          ok: createAccountResult,
          error: createAccountError,
          user: createAccountUser,
        } = await this.createAccount({ ...input });

        if (!createAccountResult && createAccountError) {
          return {
            ok: createAccountResult,
            error: createAccountError,
          };
        }

        user = createAccountUser;
      }

      const token = this.jwtService.createJwtToken(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      console.log(`Error on LogIn : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }

  async getUserById(input: GetUserByIdInput): Promise<GetUserByIdOutput> {
    try {
      const { id } = input;
      const user = await this.users.findOneOrFail(id);
      return {
        ok: true,
        user,
      };
    } catch (error) {
      console.log(`Error on getUserById : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }
  async updateProfile(
    input: UpdateProfileInput,
    loginUserId: number,
  ): Promise<UpdateProfileOutput> {
    try {
      const { userId } = input;

      if (+userId !== +loginUserId) {
        return {
          ok: false,
          error: 'You are trying to change profile that is not  yours',
        };
      }
      await this.users.save([
        {
          id: userId,
          ...input,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(`Error on UpdateProfile : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }
  async deleteAccount(
    input: DeleteAccountInput,
    loginUserId: number,
  ): Promise<DeleteAccountOutput> {
    try {
      const { id } = input;
      if (id !== loginUserId) {
        return {
          ok: false,
          error: 'You are trying to delete account that is not yours',
        };
      }
      await this.users.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(`Error on DeleteAccount: ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }
}
