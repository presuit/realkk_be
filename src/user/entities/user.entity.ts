import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { RoomEntity } from 'src/room/entities/room.entity';
import { Column, Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';

enum UserBio {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(UserBio, { name: 'UserBio' });

@Entity()
@InputType('UserEntityInput', { isAbstract: true })
@ObjectType()
export class UserEntity extends CommonEntity {
  // property
  @Column()
  @Field((type) => String)
  email: string;

  @Column()
  @Field((type) => String)
  phoneNumber: string;

  @Column()
  @Field((type) => String)
  username: string;

  @Column({ enum: UserBio })
  @Field((type) => UserBio)
  bio: UserBio;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  thumbnailImg?: string;

  // relation
  @ManyToMany((type) => RoomEntity, (room) => room.participants, {
    nullable: true,
  })
  @JoinTable()
  @Field((type) => [RoomEntity], { nullable: true })
  rooms?: RoomEntity[];

  // relation ids
  @RelationId((user: UserEntity) => user.rooms)
  roomIds: number[];
}
