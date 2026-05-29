import { Component } from '@angular/core';
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
  @Input() mode: 'login' | 'signup' = 'signup';
  @Output() close = new EventEmitter<void>();
  @Output() authSuccess = new EventEmitter<void>();
  @Output() switchMode = new EventEmitter<'login' | 'signup'>();

  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;
    const request$ = this.mode === 'signup'
      ? this.authService.register(this.username, this.password)
      : this.authService.login(this.username, this.password);

    request$.subscribe({
      next: (res) => {

        this.isLoading = false;
        this.successMessage = res.message;
        if (this.mode === 'login') {
          this.authSuccess.emit();
          this.close.emit();
        } else {
          setTimeout(() => { this.authSuccess.emit(); this.close.emit(); }, 1200);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Something went wrong.';
      }
    });
  }
}