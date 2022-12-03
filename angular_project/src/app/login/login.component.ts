import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserDTO } from '../model/user.dto';
import { ResponseDTO } from '../model/response.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private userService: UserService) { }

  email: string;
  password: string;


  navigateToHome(user_id: number) {
    this.router.navigate(['home', user_id]);
  }


  login() {
    if (this.email == null || this.password == null || this.email == '' || this.password == '') {
      alert('Preencha todos os campos');
    } else {
      let user: UserDTO = new UserDTO(this.email, this.password);
      this.userService.login(user).subscribe((response: ResponseDTO) => {
        if (response.auth) {
          this.navigateToHome(response.id);
        } else{
          alert("Ocorreu um erro ao fazer login, verifique os dados e tente novamente");
        }
      });
    }
  }


  goToCadastro() {
    this.router.navigate(['cadastro']);
  }

}
