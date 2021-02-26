import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateRoomInput, CreateRoomOutput } from './dtos/createRoom.dto';
import { GetRoomByIdInput, GetRoomByIdOutput } from './dtos/getRoomById.dto';
import { JoinRoomInput, JoinRoomOutput } from './dtos/joinRoom.dto';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly rooms: Repository<RoomEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async createRoom(
    input: CreateRoomInput,
    loginUserId: number,
  ): Promise<CreateRoomOutput> {
    try {
      const { categorySlugs, participantIds } = input;

      // validate me in participants
      const meInParticipants = participantIds.filter(
        (each) => each === loginUserId,
      )[0];

      if (!meInParticipants) {
        return {
          ok: false,
          error: 'User who want to create room should be part of participants.',
        };
      }

      // validate participants
      let userContainer: UserEntity[] = [];
      for (const id of participantIds) {
        const { ok, error, user } = await this.userService.getUserById({ id });
        if (!ok || error) {
          return {
            ok,
            error,
          };
        }
        userContainer.push(user);
      }
      // validate category slugs
      let categoryContainer: CategoryEntity[] = [];
      for (const slug of categorySlugs) {
        const {
          ok,
          error,
          category,
        } = await this.categoryService.getCategoryBySlug({ slug });
        if (!ok || error) {
          return {
            ok,
            error,
          };
        }
        categoryContainer.push(category);
      }

      const newRoom = this.rooms.create({
        categories: categoryContainer,
        participants: userContainer,
      });

      await this.rooms.save(newRoom);

      return { ok: true };
    } catch (error) {
      console.log(`Error on CreateRoom : ${error}`);
      return {
        ok: false,
        error,
      };
    }
  }

  async getRoomById(
    input: GetRoomByIdInput,
    loginUserId: number,
  ): Promise<GetRoomByIdOutput> {
    try {
      const { id } = input;
      const room = await this.rooms.findOneOrFail(id);
      const validateParticipants = room.participantIds.filter(
        (each) => each === loginUserId,
      )[0];

      if (!validateParticipants) {
        return {
          ok: false,
          error: "You can not see room that you don't exist",
        };
      }

      return {
        ok: true,
        room,
      };
    } catch (error) {
      console.log(`Error on GetRoomById : ${error}`);
      return { ok: false, error };
    }
  }

  async joinRoom(
    input: JoinRoomInput,
    loginUserId: number,
  ): Promise<JoinRoomOutput> {
    try {
      const { id } = input;
      const room = await this.rooms.findOne(id, {
        relations: ['participants'],
      });

      if (!room) {
        return {
          ok: false,
          error: 'Room that you are looking for does not exist',
        };
      }

      const { ok, user, error } = await this.userService.getUserById({
        id: loginUserId,
      });
      if (!ok || error) {
        return {
          ok,
          error,
        };
      }

      const validateParticipants = room.participants.filter(
        (each) => each.id === user.id,
      )[0];
      if (validateParticipants) {
        return {
          ok: false,
          error: 'Already exist the room',
        };
      }

      await this.rooms.save([
        {
          id,
          participants: [...room.participants, user],
        },
      ]);

      return { ok: true };
    } catch (error) {
      console.log(`Error on JoinRoom : ${error}`);
      return { ok: false, error };
    }
  }

  async updateRoom() {}
  async deleteRoom() {}
}
