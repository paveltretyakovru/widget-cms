import { EventEmitter } from '@angular/core';

export interface RemoveButtonItemInterface {
  id: string;
  label?: string;
  apiModel: string;
}

export interface RemoveButtonComponentInterface {
  items: RemoveButtonItemInterface[];
  removed: EventEmitter<any>;
  afterRedirectTo: string;            // Redirect route after request

  onClickRemoveButton(): void;
  onDialogConfirmRemove(itemsToDelete: RemoveButtonItemInterface[]): void;
}
