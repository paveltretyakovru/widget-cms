import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, from, isObservable } from 'rxjs';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { DataSource } from '@angular/cdk/table';
// import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  displayedColumns = [];
  dataSource: any[] | null = [];
  private _data = new BehaviorSubject<CmsDocument[]>([]);

  @Output() rowClicked = new EventEmitter<any>();
  @Input()
  set data(value) { this._data.next(value); }
  get data() { return this._data.getValue(); }

  meta: any = {
    attributes: []
  };

  constructor() { }

  ngOnInit() {
    this._data
      .subscribe((data: CmsDocument[] | Observable<CmsDocument[]>) => {
        if (isObservable(data)) {
          data.subscribe((documents: CmsDocument[]) => {
            if (documents && documents.length > 0) {
              const keys = Object.keys(documents.find(document => !!document));

              this.displayedColumns = this.prepareColumns(keys);
              this.dataSource = this.prepareData(documents);
            }
          });
        } else {
          if (data && data.length > 0 && typeof data[0] !== 'undefined') {
            this.displayedColumns = this.prepareColumns(Object.keys(data[0]));
            this.dataSource = this.prepareData(data);
          }
        }
      });
  }

  prepareColumns(columns: string[]) {
    return columns.filter((column) => {
      return column !== '__v' && column !== 'id';
    });
  }

  prepareData(data: any[]) {
    const keys = Object.keys(data[0]);

    return data.map((model: any) => {
      const clone = { ...model };

      if (typeof clone['_id'] !== 'undefined') {
        clone._id = clone._id.slice(0, 6);
      }

      for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(clone[keys[i]])) {
          clone[keys[i]] = 'Nested objects';
          // clone[keys[i]] = JSON.stringify(this.prepareData(clone[keys[i]]), null, 2);
        }
      }

      return { model, clone };
    });
  }

  rowClick(model) {
    this.rowClicked.emit(model);
  }
}
