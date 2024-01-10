import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(authBody: AuthBody) {
    // Je destructure l'objet authBody
    const { email, password } = authBody;
    // Je vérifie si l'utilsiteur éxiste dans la base de donnée
    const existingUser = await this.usersService.getUser(email);
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
