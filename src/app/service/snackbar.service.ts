import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  info(message: string, duration?: number) {
    this.showSnackBar(message, 'snackBarInfo', duration);
  }

  warning(message: string, duration?: number) {
    this.showSnackBar(message, 'snackBarWarning', duration);
  }

  success(message: string, duration?: number) {
    this.showSnackBar(message, 'snackBarSuccess', duration);
  }

  error(message: string, duration?: number) {
    this.showSnackBar(message, 'snackBarError', duration);
  }

  close() {
    this.snackBar.dismiss();
  }

  showSnackBar(message: string, className: string, duration: number = 2000) {
    this.snackBar.open(message, '', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: className
    })
  }

  open(message: string, action: string, className: string = 'snackBarInfo') {
    this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: className
    })
  }
}
