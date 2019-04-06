import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatBottomSheetRef, MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-link-sheet',
  templateUrl: './link-sheet.component.html',
  styleUrls: ['./link-sheet.component.scss']
})
export class LinkSheetComponent implements OnInit {
  label = '';
  pageId = '';

  pages: any[];
  formControl = new FormControl();
  filteredPages: Observable<any[]>;

  constructor(
    private api: ApiService,
    public sheetRef: MatBottomSheetRef<LinkSheetComponent>
  ) { }

  ngOnInit() {
    this.api.getAll$('pages')
      .subscribe((pages) => {
        console.log('Fetched pages', pages);

        this.pages = pages;
        this.filteredPages = this.formControl.valueChanges
          .pipe(
            startWith(''),
            map(page => this._filter(page))
          );
      });
  }

  onSelectedOption($event: MatAutocompleteSelectedEvent): void {
    console.log('Option selected', $event.option.value);

    if ($event.option.value) {
      this.pageId = $event.option.value._id;
    }
  }

  onClickDone() {
    this.sheetRef.dismiss({ pageId: this.pageId, label: this.label });
  }

  displayFn(val) {
    return (val && val._id) ? val.name : val;
  }

  private _filter(value: string | any): any[] {
    console.log('_filter, value:', { value });
    const filterValue = (typeof value === 'object') ? value.name : value;

    return this.pages.filter((page) => {
      return page.name.toLowerCase().includes(filterValue);
    });
  }

}
