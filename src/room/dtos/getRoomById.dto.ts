import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { RoomEntity } from '../entities/room.entity';

@InputType()
export class GetRoomByIdInput extends PickType(RoomEntity, ['id']) {}

@ObjectType()
export class GetRoomByIdOutput extends CommonOutput {
  @Field((type) => RoomEntity, { nullable: true })
  room?: RoomEntity;
}
