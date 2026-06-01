import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  private http = inject(HttpClient);
  private router = inject(Router);
  results: WritableSignal<any> = signal(null);
  constructor() {
    this.http.get('http://localhost:5000/get-all-jobs').subscribe({
      next: (res: any) => {
        this.results.set(
          res.results
            .map((el: any) => ({
              ...el,
              data: JSON.parse(el.data),
            }))
            .reverse()
            .filter((el: any) => {
              try {
                console.log(
                  'Cheking if null : ',
                  el.data.details.model,
                  'is null',
                  !el.data.details.model,
                );
                return el.data.details.model;
              } catch {
                return false;
              }
            }),
        );
      },
    });
  }
  openSpecific(id: string) {
    this.router.navigate(['/inverter', id]);
  }
}
