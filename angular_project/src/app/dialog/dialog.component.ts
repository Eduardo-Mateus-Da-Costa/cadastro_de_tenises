import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { TenisDTO } from '../model/tenis.dto';
import { TenisService } from '../services/tenis.service';
import { ResponseDTO } from '../model/response.dto';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tenisService: TenisService
  ) { }

  ngOnInit(): void {
    this.dialogName = this.data.name;
    this.user_id = this.data.user_id;
    if (this.data.name == "Editar") {
      this.tenis = this.data.tenis;
      this.preco = this.tenis.preco;
      this.tamanho = this.tenis.tamanho;
      this.cor = this.tenis.cor;
      this.nome = this.tenis.name;
      this.delete = true;
      this.tenis_id = this.tenis.id;
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  dialogName: string;
  delete: boolean = false;
  tenis_id: number;
  user_id: number;
  nome: string;
  preco: number;
  tamanho: number;
  cor: string;
  tenis: TenisDTO;


  deletar() {
    this.tenisService.delete(this.tenis_id, this.user_id).subscribe((response: ResponseDTO) => {
      if (response.auth) {
        this.dialogRef.close();
      } else {
        alert("Ocorreu um erro ao deletar o tênis, tente novamente mais tarde");
      }
    });
  }


  salvar() {
    if (this.dialogName == "Adicionar") {
      this.tenisService.create(new TenisDTO(this.nome, this.tamanho, this.cor, this.preco, this.user_id)).subscribe((response: ResponseDTO) => {
        if (response.auth) {
          this.dialogRef.close();
        } else {
          alert("Ocorreu um erro ao salvar os dados, tente novamente mais tarde");
        }
      });
    } else {
      console.log(this.tenis_id);
      this.tenisService.update(new TenisDTO(this.nome, this.tamanho, this.cor, this.preco, this.user_id, this.tenis_id)).subscribe((response: ResponseDTO) => {
        if (response.auth) {
          this.dialogRef.close();
        } else {
          alert("Ocorreu um erro ao salvar os dados, tente novamente mais tarde");
        }
      });
    }
  }


}
