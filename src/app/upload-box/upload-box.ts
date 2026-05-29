import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-box.html',
  styleUrls: ['./upload-box.css']
})
export class UploadBoxComponent {

  isDragging = false;

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

    if (files && files.length > 0) {
      const file = files[0];

      console.log('Dropped file:', file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      const file = input.files[0];

      console.log('Selected file:', file);
    }
  }

}
