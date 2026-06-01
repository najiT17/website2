import { Component, signal } from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class ModalComponent {
  @Input() mode: 'login' | 'signup' | null = 'signup';
  @Output() close = new EventEmitter<void>();
  @Output() authSuccess = new EventEmitter<void>();
  @Output() switchMode = new EventEmitter<'login' | 'signup'>();

  username = '';
  password = '';

  errorMessage = signal('');
  successMessage = signal('');
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage.set('Please fill in all fields.');
      return;
    }

    this.isLoading = true;
    const request$ =
      this.mode === 'signup'
        ? this.authService.register(this.username, this.password)
        : this.authService.login(this.username, this.password);

    request$.subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage.set(res.message);
        if (this.mode === 'login') {
          this.authSuccess.emit();
          this.close.emit();
        } else {
          setTimeout(() => {
            this.authSuccess.emit();
            this.close.emit();
          }, 1200);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage.set(err.error?.message || 'Something went wrong.');
      },
    });
  }
}
