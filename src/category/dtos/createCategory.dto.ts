import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';

@InputType()
export class CreateCategoryInput {
  @Field((type) => String)
  name: string;
}

@ObjectType()
export class CreateCategoryOutput extends CommonOutput {}
