import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class UpdateProfileInput extends PartialType(
  PickType(UserEntity, ['bio', 'thumbnailImg', 'username']),
) {
  @Field((type) => Int)
  userId: number;
}

@ObjectType()
export class UpdateProfileOutput extends CommonOutput {}
