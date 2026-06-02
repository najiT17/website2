import { Component, inject, signal } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '../dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {
  @Output() openAuth = new EventEmitter<'login' | 'signup'>();
  isUploading = signal(false);
  private dialog = inject(DialogService);

  constructor(
    public authService: AuthService,
    private http: HttpClient,
  ) {}

  logout() {
    this.authService.logout();
  }

  onExcelSelected(event: Event) {
    console.log('Excel selected');

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    console.log('There are files');

    const formData = new FormData();
    formData.append('file', input.files[0]);

    const token = this.authService.getToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = token;

    this.isUploading.set(true);

    this.http.post<any>('http://localhost:5000/upload-excel', formData, { headers }).subscribe({
      next: (res) => {
        this.isUploading.set(false);
        this.dialog.success('Upload succesful', res.message);
      },
      error: (err) => {
        this.isUploading.set(false);
        this.dialog.error('Upload failed', err.error?.message || 'Failed to upload the Excel file');
      },
    });
  }
}
