import { WidgetsUpdatedResult } from '../grid.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  result: WidgetsUpdatedResult;

  constructor(
    public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {}

  onClickDone() {
    this.dialogRef.close(this.result);
  }

  onGridWidgetsUpdated($event: WidgetsUpdatedResult) {
    this.result = $event;
  }
}
