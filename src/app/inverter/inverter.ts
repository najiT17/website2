import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { single } from 'rxjs';
import { SecurePipe } from '../secure-pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-inverter',
  imports: [AsyncPipe, SecurePipe],
  templateUrl: './inverter.html',
  styleUrl: './inverter.css',
})
export class Inverter {
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);
  private result_id = 0;
  result: WritableSignal<any> = signal(null);
  img_url = signal('');
  isLoading = signal(true);
  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.result_id = params['id'];
      this.http.get('http://localhost:5000/result/' + this.result_id).subscribe({
        next: (res: any) => {
          this.result.set(JSON.parse(res.result.data));
          this.img_url.set('http://localhost:5000/images/' + this.result_id);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    });
  }
}
