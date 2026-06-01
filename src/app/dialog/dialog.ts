import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="background" [class]="data.type">
      <h2>{{ data.title }}</h2>
      <p>{{ data.message }}</p>

      <div class="actions">
        @if (data.type === 'confirm') {
          <button class="secondary" (click)="close(false)">Cancel</button>
        }

        @if (data.type === 'confirm') {
          <button class="primary" (click)="close(true)">Confirm</button>
        } @else {
          <button class="primary" (click)="close()">OK</button>
        }
      </div>
    </div>
  `,
  styleUrls: ['./dialog.css'],
})
export class DialogComponent {
  data = inject(MAT_DIALOG_DATA) as DialogData;
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  close(result?: boolean) {
    this.dialogRef.close(result);
  }
}
