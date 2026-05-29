import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-box.html',
  styleUrls: ['./upload-box.css']
})
export class UploadBoxComponent {
  isDragging = false;
  isLoading = signal(false)
  result: WritableSignal<any> = signal(null);
  error = '';

  

  constructor(private http: HttpClient, private authService: AuthService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) this.uploadFile(files[0]);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.uploadFile(input.files[0]);
  }

  uploadFile(file: File) {
  this.isLoading.set(true);
  this.result.set(null);
  
  this.error = '';

  const formData = new FormData();
  formData.append('image', file);

  const token = this.authService.getToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = token;

  this.http.post<any>('http://localhost:5000/upload', formData, { headers }).subscribe({
    next: (res) => {
      this.isLoading.set(false);
      this.result.set(res.response);
      console.log(this.result)
    },
    error: (err) => {
      this.isLoading.set(false);
      this.error = err.error?.message || 'Upload failed.';
    }
  });
}
}