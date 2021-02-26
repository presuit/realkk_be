import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';

@InputType()
export class CreateRoomInput {
  @Field((type) => [Int])
  participantIds: number[];

  @Field((type) => [String])
  categorySlugs: string[];
}

@ObjectType()
export class CreateRoomOutput extends CommonOutput {}
