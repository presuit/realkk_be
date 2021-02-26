import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class GetUserByIdInput extends PickType(UserEntity, ['id']) {}

@ObjectType()
export class GetUserByIdOutput extends CommonOutput {
  @Field((type) => UserEntity, { nullable: true })
  user?: UserEntity;
}
