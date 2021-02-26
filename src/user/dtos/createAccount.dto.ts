import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/category/dtos/commonOutput.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(UserEntity, [
  'bio',
  'email',
  'phoneNumber',
  'username',
]) {
  @Field((type) => String, { nullable: true })
  thumbnailImg?: string;
}

@ObjectType()
export class CreateAccountOutput extends CommonOutput {
  @Field((type) => UserEntity, { nullable: true })
  user?: UserEntity;
}
