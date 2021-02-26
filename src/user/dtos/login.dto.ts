import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/category/dtos/commonOutput.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class LogInInput extends PickType(UserEntity, [
  'email',
  'phoneNumber',
  'bio',
  'username',
]) {
  @Field((type) => String, { nullable: true })
  thumbnailImg?: string;
}

@ObjectType()
export class LogInOuput extends CommonOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
