import { EventEmitter } from '@angular/core';

export interface RemoveButtonItemInterface {
  id: string;
  label?: string;
  apiModel: string;
}

export interface RemoveButtonComponentInterface {
  items: RemoveButtonItemInterface[];
  removed: EventEmitter<any>;
  afterRedirectTo: string;

  onClickRemoveButton(): void;
  onDialogConfirmRemove(itemsToDelete: RemoveButtonItemInterface[]): void;
}
