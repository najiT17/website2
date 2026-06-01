import { Component } from '@angular/core';

import { NavbarComponent } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavbarComponent, ModalComponent],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  modalType: 'login' | 'signup' | null = null;

  openModal(type: 'login' | 'signup') {
    console.log('Opening', type);
    this.modalType = type;
  }

  closeModal() {
    this.modalType = null;
  }

  onAuthSuccess() {
    console.log('Logged in! Token:', localStorage.getItem('token'));
    this.closeModal();
  }
}
