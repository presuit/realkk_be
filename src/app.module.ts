import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { MsgModule } from './msg/msg.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';
import { UserEntity } from './user/entities/user.entity';
import { RoomEntity } from './room/entities/room.entity';
import { MsgEntity } from './msg/entities/msg.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0505',
      database: 'realkk_be',
      entities: [UserEntity, RoomEntity, MsgEntity, CategoryEntity],
      synchronize: true,
    }),
    UserModule,
    RoomModule,
    MsgModule,
    CategoryModule,
    CommonModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
