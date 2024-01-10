export class AuthBody {
  id: number;
  email: string;
  password: string;
}

export class CreateUserDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
