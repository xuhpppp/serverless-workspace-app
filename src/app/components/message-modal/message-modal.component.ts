import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.css'
})
export class MessageModalComponent implements OnInit{

  @Input() message : string = ''
  @Output() modalClose = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {

  }

  modalCloseClick() {
    this.modalClose.emit(true)
  }
}
