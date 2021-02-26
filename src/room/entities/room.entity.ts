import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { MsgEntity } from 'src/msg/entities/msg.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, ManyToMany, OneToMany, RelationId } from 'typeorm';

@Entity()
@InputType('RoomEntityInput', { isAbstract: true })
@ObjectType()
export class RoomEntity extends CommonEntity {
  // relation
  @OneToMany((type) => MsgEntity, (msg) => msg.room, { nullable: true })
  @Field((type) => [MsgEntity], { nullable: true })
  msgs?: MsgEntity[];

  @ManyToMany((type) => UserEntity, (user) => user.rooms)
  @Field((type) => [UserEntity])
  participants: UserEntity[];

  @ManyToMany((type) => CategoryEntity, (category) => category.rooms)
  @Field((type) => [CategoryEntity])
  categories: CategoryEntity[];

  // relation Ids
  @RelationId((room: RoomEntity) => room.categories)
  categoryIds: number[];

  @RelationId((room: RoomEntity) => room.participants)
  participantIds: number[];

  @RelationId((room: RoomEntity) => room.msgs)
  msgIds: number[];
}
