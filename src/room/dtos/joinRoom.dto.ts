import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { RoomEntity } from '../entities/room.entity';

@InputType()
export class JoinRoomInput extends PickType(RoomEntity, ['id']) {}

@ObjectType()
export class JoinRoomOutput extends CommonOutput {}
