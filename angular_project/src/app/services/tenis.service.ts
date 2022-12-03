import { SearchDTO } from './../model/tenis.dto';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from 'src/app/model/response.dto';
import { TenisDTO } from '../model/tenis.dto';

@Injectable({
  providedIn: 'root'
})

export class TenisService {

    constructor(private httpClient: HttpClient) { }

    list(search: SearchDTO){
      return this.httpClient.patch<ResponseDTO>(`${environment.urlApi}/search`, search);
    }

    create(tenis: TenisDTO){
      return this.httpClient.post<ResponseDTO>(`${environment.urlApi}/createTenis`, tenis);
    }

    update(tenis: TenisDTO){
      return this.httpClient.put<ResponseDTO>(`${environment.urlApi}/updateTenis`, tenis);
    }

    delete(id: number, user_id: number){
      return this.httpClient.delete<ResponseDTO>(`${environment.urlApi}/deleteTenis/${id}/${user_id}`);
    }

  }
