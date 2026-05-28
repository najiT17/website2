import { Component } from '@angular/core';

import { Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone:true,
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class ModalComponent {

  @Input()
  mode: 'login' | 'signup' = 'signup';

  @Output()
  close = new EventEmitter();
}
