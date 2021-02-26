import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categories: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    input: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    try {
      const { name } = input;
      let slug = name.toUpperCase().trim();
      while (slug.indexOf(' ') > -1) {
        slug = slug.replace(' ', '-');
      }
      const newCategory = this.categories.create({ slug });
      await this.categories.save(newCategory);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(`Error on CreateCategory : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }
  async getCategoryBySlug(
    input: GetCategoryBySlugInput,
  ): Promise<GetCategoryBySlugOutput> {
    try {
      const { slug } = input;
      const category = await this.categories.findOneOrFail({ slug });
      return {
        ok: true,
        category,
      };
    } catch (error) {
      console.log(`Error on GetCategoryBySlug : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }
  async updateCategory(
    input: UpdateCategoryInput,
  ): Promise<UpdateCategoryOutput> {
    try {
      const { name, slug } = input;

      const { ok, error, category } = await this.getCategoryBySlug({ slug });
      if (!ok || error) {
        return {
          ok,
          error,
        };
      }
      let newSlug = name.toUpperCase().trim();
      while (newSlug.indexOf(' ') > -1) {
        newSlug = newSlug.replace(' ', '-');
      }

      await this.categories.save([
        {
          id: category.id,
          slug: newSlug,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(`Error on UpdateCategory : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }
  async deleteCategory(
    input: DeleteCategoryInput,
  ): Promise<DeleteCategoryOutput> {
    try {
      const { slug } = input;
      const { ok, category, error } = await this.getCategoryBySlug({ slug });
      if (!ok || error) {
        return {
          ok,
          error,
        };
      }
      await this.categories.delete(category.id);
      return { ok: true };
    } catch (error) {
      console.log(`Error on DeleteCategory : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }
}
