import { RemoveButtonItemInterface } from '../remove-button-component.interface';
import { RemoveButtonDialogComponent } from './remove-button-dialog.component';
import { MatDialogRef } from '@angular/material';

export interface RemoveButtonGroupInterface {
  item: RemoveButtonItemInterface;
  checked: boolean;
}

export interface RemoveButtonDialogComponentInterface {
  // Constructor properties
  dialogRef: MatDialogRef<RemoveButtonDialogComponent>;
  removeItems: RemoveButtonItemInterface[];
  removeGroups: RemoveButtonGroupInterface[];

  onClickConfirmButton(): void;
  onClickCancelButton(): void;
}
