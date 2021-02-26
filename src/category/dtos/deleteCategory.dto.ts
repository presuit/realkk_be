import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/commonOutput.dto';
import { CategoryEntity } from '../entities/category.entity';

@InputType()
export class DeleteCategoryInput extends PickType(CategoryEntity, ['slug']) {}

@ObjectType()
export class DeleteCategoryOutput extends CommonOutput {}
