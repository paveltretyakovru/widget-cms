import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RemoveButtonItemInterface } from '../remove-button-component.interface';
import { RemoveButtonDialogComponentInterface } from './remove-button-dialog-component.interface';

@Component({
  selector: 'app-remove-button-dialog',
  templateUrl: './remove-button-dialog.component.html',
  styleUrls: ['./remove-button-dialog.component.scss']
})
export class RemoveButtonDialogComponent
       implements RemoveButtonDialogComponentInterface, OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveButtonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public removeItems: RemoveButtonItemInterface[]
  ) { }

  ngOnInit() {
  }

  onClickConfirmButton(): void {
    this.dialogRef.close(this.removeItems);
  }

  onClickCancelButton(): void {
    this.dialogRef.close();
  }
}
