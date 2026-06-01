import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  success(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        type: 'success',
        title,
        message,
      },
    });
  }

  error(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        type: 'error',
        title,
        message,
      },
    });
  }

  confirm(title: string, message: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        type: 'confirm',
        title,
        message,
      },
    });
  }
}

export interface DialogData {
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  close: (result?: boolean) => void;
}
