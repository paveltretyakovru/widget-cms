import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/admin/models/model/model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatBottomSheetRef, MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-model-sheet',
  templateUrl: './model-sheet.component.html',
  styleUrls: ['./model-sheet.component.scss']
})
export class ModelSheetComponent implements OnInit {
  models: Model[];
  formControl = new FormControl();
  filteredModels: Observable<Model[]>;

  constructor(
    private api: ApiService,
    public sheetRef: MatBottomSheetRef<ModelSheetComponent>
  ) { }

  ngOnInit() {
    this.api.getAll$('models')
      .subscribe((models) => {
        console.log('Fetched models', models);

        this.models = models;
        this.filteredModels = this.formControl.valueChanges
          .pipe(
            startWith(''),
            map(model => this._filter(model))
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

  private _filter(value: string | Model): Model[] {
    console.log('_filter, value:', { value });
    const filterValue = (typeof value === 'object') ? value.name : value;

    return this.models.filter((model) => {
      return model.name.toLowerCase().includes(filterValue);
    });
  }
}
