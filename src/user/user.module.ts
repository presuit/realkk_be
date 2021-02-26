import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/jwt/jwt.module';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
