import { environment } from '../../environments/environment';
import { UserDTO } from 'src/app/model/user.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from 'src/app/model/response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(user: UserDTO){
    return this.httpClient.post<ResponseDTO>(`${environment.urlApi}/sign-up`, user);
  }

  login(data: UserDTO){
    return this.httpClient.patch<ResponseDTO>(`${environment.urlApi}/login`, data);
  }
}
