import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoComponent } from './components/botao/botao.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    BotaoComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    BotaoComponent
  ]
})
export class UtilModule { }
