import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent {
  constructor(public snackBar: MatSnackBar) {	}

  // TODO: Crate queue from snackbars
  public open(message, action = 'success', duration = 4000) {
    this.snackBar.open(message, action, { duration, horizontalPosition: 'left' });
  }
}
