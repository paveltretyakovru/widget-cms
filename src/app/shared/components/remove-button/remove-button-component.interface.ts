import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RemoveButtonItemInterface {
  id: string | string[];
  label?: string;
  apiModel: string;
  required?: boolean;
}

export interface RemoveButtonComponentInterface {
  items: RemoveButtonItemInterface[];
  _items: BehaviorSubject<RemoveButtonItemInterface[]>;
  removed: EventEmitter<any>;
  afterRedirectTo: string; // Redirect route after request

  onClickRemoveButton(): void;
  onDialogConfirmRemove(itemsToDelete: RemoveButtonItemInterface[]): void;
}
