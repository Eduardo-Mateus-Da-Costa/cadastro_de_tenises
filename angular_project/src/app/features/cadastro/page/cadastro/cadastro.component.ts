import { UserService } from "src/app/services/user.service";
import { UserDTO } from "src/app/model/user.dto";
import { Component } from "@angular/core";


@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"]
})

export class CadastroComponent {
  constructor(private userService: UserService) {}

  register(user: UserDTO) {
    this.userService.register(user).subscribe(response => {
      console.log(response);
    });
  }
}
