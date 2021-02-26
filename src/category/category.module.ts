import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
