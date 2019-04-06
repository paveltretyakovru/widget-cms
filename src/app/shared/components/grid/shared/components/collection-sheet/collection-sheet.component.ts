import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormControl } from '@angular/forms';
import { Collection } from 'src/app/admin/collections/collection/collection';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-collection-sheet',
  templateUrl: './collection-sheet.component.html',
  styleUrls: ['./collection-sheet.component.scss']
})
export class CollectionSheetComponent implements OnInit {
  collections: Collection[];
  formControl = new FormControl();
  filteredCollections: Observable<Collection[]>;

  constructor(
    private api: ApiService,
    public sheetRef: MatBottomSheetRef<CollectionSheetComponent>
  ) { }

  ngOnInit() {
    this.api.getAll$('collections')
      .subscribe((collections) => {
        console.log('Fetched collections', collections);

        this.collections = collections;
        this.filteredCollections = this.formControl.valueChanges
          .pipe(
            startWith(''),
            map(collection => this._filter(collection))
          );
      });
  }

  onSelectedOption($event: MatAutocompleteSelectedEvent): void {
    console.log('Option selected', $event.option.value);
    this.sheetRef.dismiss($event.option.value);
  }

  displayFn(val) {
    return (val && val._id) ? val.name : val;
  }

  private _filter(value: string | Collection): Collection[] {
    console.log('_filter, value:', { value });
    const filterValue = (typeof value === 'object') ? value.name : value;

    return this.collections.filter((collection) => {
      return collection.name.toLowerCase().includes(filterValue);
    });
  }

}
