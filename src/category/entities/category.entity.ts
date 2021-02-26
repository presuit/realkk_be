import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/common.entity';
import { RoomEntity } from 'src/room/entities/room.entity';
import { Column, Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';

@Entity()
@InputType('CategoryEntityInput', { isAbstract: true })
@ObjectType()
export class CategoryEntity extends CommonEntity {
  // property
  @Column({ unique: true })
  @Field((type) => String)
  slug: String;

  //   relation
  @ManyToMany((type) => RoomEntity, (room) => room.categories, {
    nullable: true,
  })
  @JoinTable()
  @Field((type) => [RoomEntity], { nullable: true })
  rooms?: RoomEntity[];

  // relation ids
  @RelationId((category: CategoryEntity) => category.rooms)
  roomIds: number[];
}
