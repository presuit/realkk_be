import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { CategoryEntity } from '../entities/category.entity';

@InputType()
export class GetCategoryBySlugInput extends PickType(CategoryEntity, [
  'slug',
]) {}

@ObjectType()
export class GetCategoryBySlugOutput extends CommonOutput {
  @Field((type) => CategoryEntity, { nullable: true })
  category?: CategoryEntity;
}
