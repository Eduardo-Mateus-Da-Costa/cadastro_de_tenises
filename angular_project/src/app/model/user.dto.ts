export class UserDTO {
  name: string;
  email: string;
  password: string;
  id?: number;

  constructor(name: string, email: string, password: string, id?: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
