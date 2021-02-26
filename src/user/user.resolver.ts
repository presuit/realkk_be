import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRole } from 'src/common/auth.role';
import { AuthUser } from 'src/common/authUser';
import { UserService } from './user.service';
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

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @AuthRole('Allowed')
  @Mutation((returns) => CreateAccountOutput)
  createAccount(
    @Args('input') input: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(input);
  }

  @AuthRole('Allowed')
  @Mutation((returns) => LogInOuput)
  logIn(@Args('input') input: LogInInput): Promise<LogInOuput> {
    return this.userService.logIn(input);
  }

  @AuthRole('Allowed')
  @Query((returns) => GetUserByIdOutput)
  getUserById(
    @Args('input') input: GetUserByIdInput,
  ): Promise<GetUserByIdOutput> {
    return this.userService.getUserById(input);
  }

  @AuthRole('OnlyLogin')
  @Mutation((returns) => UpdateProfileOutput)
  updateProfile(
    @AuthUser() loginUserId: number,
    @Args('input') input: UpdateProfileInput,
  ): Promise<UpdateProfileOutput> {
    return this.userService.updateProfile(input, loginUserId);
  }

  @AuthRole('OnlyLogin')
  @Mutation((returns) => DeleteAccountOutput)
  deleteAccount(
    @AuthUser() loginUserId: number,
    @Args('input') input: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    return this.userService.deleteAccount(input, loginUserId);
  }
}
