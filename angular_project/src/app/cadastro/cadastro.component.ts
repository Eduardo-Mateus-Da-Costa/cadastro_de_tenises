import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserDTO } from '../model/user.dto';
import { ResponseDTO } from '../model/response.dto';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  constructor(private router: Router, private userService: UserService) { }

  name: string;
  email: string;
  password: string;

  navigateToHome(user_id: number) {
    this.router.navigate(['home', user_id]);
  }

  cadastrar() {
    if (this.name == null || this.email == null || this.password == null) {
      alert("Preencha todos os campos!");
    }
    else {
      let user = new UserDTO(this.email, this.password, null, this.name);
      this.userService.register(user).subscribe((response: ResponseDTO) => {
        if (response.auth) {
          this.navigateToHome(response.id);
        }
        else {
          alert("Ocorreu um erro ao fazer cadastro, verifique os dados e tente novamente");
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
