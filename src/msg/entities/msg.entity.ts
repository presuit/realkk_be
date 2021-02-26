import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { RoomEntity } from 'src/room/entities/room.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@InputType('MsgEntityInput', { isAbstract: true })
@ObjectType()
export class MsgEntity extends CommonEntity {
  // property
  @Column()
  @Field((type) => String)
  msgBody: string;

  @Column()
  @Field((type) => Int)
  fromUserId: number;

  // relation
  @ManyToOne((type) => RoomEntity, (room) => room.msgs, { onDelete: 'CASCADE' })
  @Field((type) => RoomEntity)
  room: RoomEntity;
}
