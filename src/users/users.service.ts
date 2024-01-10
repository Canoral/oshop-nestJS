import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return users;
  }

  async getUser(id: number): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('The user does not exist');
    }
    return user;
  }
}
