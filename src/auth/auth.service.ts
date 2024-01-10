import { Injectable } from '@nestjs/common';
import { AuthBody, CreateUserDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Users)
    private user: Repository<Users>,
  ) {}
  async login(authBody: AuthBody) {
    // Je destructure l'objet authBody
    const { id, password } = authBody;
    // Je vérifie si l'utilsiteur éxiste dans la base de donnée
    const existingUser = await this.usersService.getUser(id);
    if (!existingUser) {
      throw new Error("L'e-mail ou le mot de passe est invalide");
    }
    // Je compare le mot de passe que je récupère dans authBody à celui qui est enregistré dans la base de donnée
    const isPasswordSame = await this.isPasswordValid(
      password,
      existingUser.password,
    );
    if (!isPasswordSame) {
      throw new Error("L'e-mail ou le mot de passe est invalide");
    }
    return this.authentificateUser(existingUser.id);
  }

  async register(createUserDto: CreateUserDto) {
    // Je destructure l'objet authBody
    const { firstname, lastname, email, password, passwordConfirm } =
      createUserDto;
    // Je vérifie si l'utilsiteur éxiste dans la base de donnée
    const existingUser = await this.user.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      throw new Error("L'e-mail ou le mot de passe éxiste déja");
    }
    if (password !== passwordConfirm) {
      throw new Error(
        'Le mot de passe et la confirmation ne sont pas identiques',
      );
    }
    const hashPassword = await this.hashPassword(password);
    const createdUser = this.user.create({
      name: firstname + ' ' + lastname,
      email: email,
      password: hashPassword,
      roles: { id: 1 },
    });
    const savedUser = await this.user.save(createdUser);
    console.log('savedUser :', savedUser);
    return this.authentificateUser(createdUser.id);
  }

  private async hashPassword(password: string) {
    const hasshedPassword = await bcrypt.hash(password, 10);
    return hasshedPassword;
  }
  private async isPasswordValid(password: string, hashPassword: string) {
    const isMatching = await bcrypt.compare(password, hashPassword);
    return isMatching;
  }
  private authentificateUser(userId: number) {
    const payload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
