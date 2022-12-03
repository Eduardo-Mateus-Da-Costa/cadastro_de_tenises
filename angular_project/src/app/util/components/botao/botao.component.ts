import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.scss']
})
export class BotaoComponent {
  @Input() descricao: string;
  @Output() onClick = new EventEmitter();

  clickei() {
    this.onClick.emit();
  }
}
