import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { ResponseDTO } from '../model/response.dto';
import { TenisDTO } from '../model/tenis.dto';
import { TenisService } from '../services/tenis.service';
import { SearchDTO } from '../model/tenis.dto';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private tesnisService: TenisService,
    private ac: ActivatedRoute,
    private router: Router
    ) { }

  tenises: TenisDTO[] = [];

  user_id: number;

  ngOnInit(){
    this.user_id = Number.parseInt(this.ac.snapshot.paramMap.get('user_id'));
    this.search();
  }

  nome: string;
  preco: number;
  tamanho: number;
  cor: string;
  isOpen: boolean = false;


  search() {
    let search: SearchDTO = new SearchDTO(this.user_id, this.nome, this.tamanho, this.cor, this.preco);
    this.tesnisService.list(search).subscribe((response: ResponseDTO) => {
      if (response.auth) {
        this.tenises = response.result.map((tenis: any) => {
          return new TenisDTO(tenis.name, tenis.size, tenis.color, tenis.price, tenis.user_id, Number.parseInt(tenis.tenis_id));
        });
      } else{
        alert("Ocorreu um erro ao carregar os dados, tente novamente mais tarde");
      }
    });
  }


  adicionar(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      width: '500px',
      height: '',
      position: {
          left: '37vw'
      },
      panelClass:'makeItMiddle',
      data: { name: "Adicionar", user_id: this.user_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOpen = false;
      this.search();
    });
  }


  editar(tenis: TenisDTO){
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      width: '500px',
      height: '',
      position: {
          left: '37vw'
      },
      panelClass:'makeItMiddle',
      data: { name: "Editar", tenis: tenis, user_id: this.user_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOpen = false;
      this.search();
    });
  }


  logout() {
    this.router.navigate(['login']);
  }
}
