import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { RemoveButtonDialogComponent } from './remove-button-dialog/remove-button-dialog.component';
import { RemoveButtonComponentInterface, RemoveButtonItemInterface } from './remove-button-component.interface';

@Component({
  selector: 'app-remove-button',
  templateUrl: './remove-button.component.html',
  styleUrls: ['./remove-button.component.scss']
})
export class RemoveButtonComponent
      implements RemoveButtonComponentInterface, OnInit {

  _items = new BehaviorSubject<RemoveButtonItemInterface[]>([]);
  @Input()
    set items(value) { this._items.next(value); }
    get items() { return this._items.getValue(); }

  @Input() afterRedirectTo: string;

  @Output() removed = new EventEmitter<any>();

  constructor(
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._items.subscribe((items) => {
      // console.log('Subscribe to _items', items);
    });
  }

  onDialogConfirmRemove(itemsToDelete: RemoveButtonItemInterface[] = []): void {
    const requests$: Observable<any>[] = [];

    itemsToDelete.forEach((item: RemoveButtonItemInterface) => {
      if (item.apiModel && item.id) {
        const id: string = (typeof item.id === 'string') ? item.id : item.id[0];
        requests$.push(this.api.delete$(item.apiModel, id));
      }
    });

    forkJoin(requests$).subscribe((responseList) => {
      this.removed.emit(responseList);

      if (this.afterRedirectTo) {
        this.router.navigate([this.afterRedirectTo]);
      }
    });
  }

  onClickRemoveButton(): void {
    this.dialog
      .open(RemoveButtonDialogComponent, {
        data: this.items
      })
      .afterClosed()
        .subscribe((itemsToDelete: RemoveButtonItemInterface[]) => {
          if (itemsToDelete) {
            this.onDialogConfirmRemove(itemsToDelete);
          }
        });
  }
}
