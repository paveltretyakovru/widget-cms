import { Component, OnInit, Input, Inject } from '@angular/core';
import { Widget } from '../widget';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-widgets-dialog',
  templateUrl: './widgets-dialog.component.html',
  styleUrls: ['./widgets-dialog.component.scss']
})
export class WidgetsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WidgetsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public widget: Widget
  ) { }

  ngOnInit() {
  }

  onClickDone(): void {
    this.dialogRef.close(this.widget);
  }
}
