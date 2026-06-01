import { Component, inject } from '@angular/core';

import { NavbarComponent } from './navbar/navbar';
import { HeroComponent } from './hero/hero';
import { UploadBoxComponent } from './upload-box/upload-box';
import { ModalComponent } from './modal/modal';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [HeroComponent, UploadBoxComponent, CommonModule],

  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  modalType: 'login' | 'signup' | null = null;
  auth = inject(AuthService);

  openModal(type: 'login' | 'signup') {
    this.modalType = type;
  }

  closeModal() {
    this.modalType = null;
  }

  onAuthSuccess() {
    console.log('Logged in! Token:', localStorage.getItem('token'));
    this.closeModal();
  }

  // A lot of duplication because Domen vibe coded this thingy and ofcourse it didnt work out so now all code is mess
}
