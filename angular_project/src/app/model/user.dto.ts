export class UserDTO {
  name?: string;
  email: string;
  password: string;
  id?: number;

  constructor(email: string, password: string, id?: number, name?: string,) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
