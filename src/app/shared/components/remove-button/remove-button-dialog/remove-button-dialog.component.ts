import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RemoveButtonItemInterface } from '../remove-button-component.interface';
import { RemoveButtonDialogComponentInterface, RemoveButtonGroupInterface } from './remove-button-dialog-component.interface';

@Component({
  selector: 'app-remove-button-dialog',
  templateUrl: './remove-button-dialog.component.html',
  styleUrls: ['./remove-button-dialog.component.scss']
})
export class RemoveButtonDialogComponent
       implements RemoveButtonDialogComponentInterface, OnInit {
  removeGroups: RemoveButtonGroupInterface[] = [];

  constructor(
    public dialogRef: MatDialogRef<RemoveButtonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public removeItems: RemoveButtonItemInterface[]
  ) { }

  ngOnInit() {
    this.removeItems.forEach(
      (item: RemoveButtonItemInterface) => {
        if (item.id) {
          this.removeGroups.push({ item, checked: true });
        }
      }
    );
  }

  // ===========================================================================
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Events ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ===========================================================================
  onClickConfirmButton(): void {
    const resultItems: RemoveButtonItemInterface[] = [];

    this.removeGroups.forEach((group) => {
      if (group.checked) {
        if (Array.isArray(group.item.id)) {
          group.item.id.forEach((itemId) => {
            resultItems.push({
              id: itemId,
              apiModel: group.item.apiModel,
            });
          });
        }

        if (group.item.id && group.item.apiModel) {
          resultItems.push({
            id: group.item.id,
            apiModel: group.item.apiModel,
          });
        }
      }
    });

    this.dialogRef.close(resultItems);
  }

  onClickCancelButton(): void {
    this.dialogRef.close();
  }
}
