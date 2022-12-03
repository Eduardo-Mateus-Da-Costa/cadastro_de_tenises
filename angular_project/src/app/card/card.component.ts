import { TenisDTO } from './../model/tenis.dto';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() onEdit: EventEmitter<TenisDTO> = new EventEmitter();
  @Input() tenis: TenisDTO;

  constructor() { }

  ngOnInit(): void {
  }

  editar() {
    this.onEdit.emit(this.tenis);
  }
}
