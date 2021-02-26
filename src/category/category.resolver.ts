import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRole } from 'src/common/auth.role';
import { CategoryService } from './category.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/createCategory.dto';
import {
  DeleteCategoryInput,
  DeleteCategoryOutput,
} from './dtos/deleteCategory.dto';
import {
  GetCategoryBySlugInput,
  GetCategoryBySlugOutput,
} from './dtos/getCategoryBySlug.dto';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from './dtos/updateCategory.dto';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @AuthRole('OnlyLogin')
  @Mutation((returns) => CreateCategoryOutput)
  createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoryService.createCategory(input);
  }

  @AuthRole('OnlyLogin')
  @Query((returns) => GetCategoryBySlugOutput)
  getCategoryBySlug(
    @Args('input') input: GetCategoryBySlugInput,
  ): Promise<GetCategoryBySlugOutput> {
    return this.categoryService.getCategoryBySlug(input);
  }

  @AuthRole('OnlyLogin')
  @Mutation((returns) => UpdateCategoryOutput)
  updateCategory(
    @Args('input') input: UpdateCategoryInput,
  ): Promise<UpdateCategoryOutput> {
    return this.categoryService.updateCategory(input);
  }

  @AuthRole('OnlyLogin')
  @Mutation((returns) => DeleteCategoryOutput)
  deleteCategory(
    @Args('input') input: DeleteCategoryInput,
  ): Promise<DeleteCategoryOutput> {
    return this.categoryService.deleteCategory(input);
  }
}
