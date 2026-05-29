import { Component, signal } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Output() openAuth = new EventEmitter<'login' | 'signup'>();
  isUploading = false;
  uploadMessage = signal('');

  constructor(public authService: AuthService, private http: HttpClient) {}

  logout() {
    this.authService.logout();
  }

  onExcelSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const formData = new FormData();
    formData.append('file', input.files[0]);

    const token = this.authService.getToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = token;

    this.isUploading = true;
    this.uploadMessage.set('');

    this.http.post<any>('http://localhost:5000/upload-excel', formData, { headers }).subscribe({
      next: (res) => { this.isUploading = false; this.uploadMessage.set(res.message); },
      error: (err) => { this.isUploading = false; this.uploadMessage.set(err.error?.message || 'Upload failed.'); }
    });
  }
}