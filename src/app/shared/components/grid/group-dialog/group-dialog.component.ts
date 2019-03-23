import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WidgetBackbone } from '../interfaces/widget';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  result: WidgetBackbone[];

  constructor(
    public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {}

  onClickDone() {
    this.dialogRef.close(this.result);
  }

  onGridWidgetsUpdated($event: WidgetBackbone[]) {
    this.result = $event;
  }
}
