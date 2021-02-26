import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { CategoryEntity } from '../entities/category.entity';

@InputType()
export class UpdateCategoryInput extends PickType(CategoryEntity, ['slug']) {
  @Field((type) => String)
  name: string;
}

@ObjectType()
export class UpdateCategoryOutput extends CommonOutput {}
