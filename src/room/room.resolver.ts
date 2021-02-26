import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthRole } from 'src/common/auth.role';
import { AuthUser } from 'src/common/authUser';
import { CreateRoomInput, CreateRoomOutput } from './dtos/createRoom.dto';
import { GetRoomByIdInput, GetRoomByIdOutput } from './dtos/getRoomById.dto';
import { JoinRoomInput, JoinRoomOutput } from './dtos/joinRoom.dto';
import { RoomService } from './room.service';

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @AuthRole('OnlyLogin')
  @Mutation((returns) => CreateRoomOutput)
  createRoom(
    @AuthUser() loginUserId: number,
    @Args('input') input: CreateRoomInput,
  ): Promise<CreateRoomOutput> {
    return this.roomService.createRoom(input, loginUserId);
  }

  @AuthRole('OnlyLogin')
  @Query((returns) => GetRoomByIdOutput)
  getRoomById(
    @AuthUser() loginUserId: number,
    @Args('input') input: GetRoomByIdInput,
  ): Promise<GetRoomByIdOutput> {
    return this.roomService.getRoomById(input, loginUserId);
  }

  @AuthRole('OnlyLogin')
  @Mutation((returns) => JoinRoomOutput)
  joinRoom(
    @AuthUser() loginUserId: number,
    @Args('input') input: JoinRoomInput,
  ): Promise<JoinRoomOutput> {
    return this.roomService.joinRoom(input, loginUserId);
  }
}
