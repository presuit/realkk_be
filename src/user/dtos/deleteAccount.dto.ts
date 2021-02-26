import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class DeleteAccountInput extends PickType(UserEntity, ['id']) {}

@ObjectType()
export class DeleteAccountOutput extends CommonOutput {}
