import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { startWith, map } from 'rxjs/operators';

export const _filter = (
  opt: { name: string; document: any }[],
  value: any
): { name: string; document: any }[] => {

  const filterValue = (typeof value === 'object')
    ? value.name.toLowerCase()
    : value.toLowerCase();

  return opt.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
};

export interface StateGroup {
  letter: string;
  names: {
    name: string;
    document: any;
  }[];
}

@Component({
  selector: 'app-widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.scss']
})
export class WidgetSettingsComponent implements OnInit {
  selectedDocument: CmsDocument;
  selectedDocumentField: any;

  stateForm: FormGroup = this.fb.group({ stateGroup: '' });
  stateGroups: StateGroup[] = [];
  stateGroupOptions: Observable<StateGroup[]>;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<WidgetSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.fetchDocuments();

    this.stateGroupOptions = this.stateForm.get('stateGroup').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  dataSelected($event) {
    this.dialogRef.close($event);
  }

  fetchDocuments() {
    this.api.getAll$('documents')
      .subscribe((documents) => {
        console.log('Fetched documents!', documents);
        const fields = [{
          letter: 'Single document',
          names: [],
        }];

        documents.forEach((document) => {
          if (document.collection) {
            const search = fields.find(field => (
              field.letter === document.collection.name
            ));

            if (search) {
              search.names.push({ name: document.name, document });
            } else {
              fields.push({
                letter: document.collection.name,
                names: [{ name: document.name, document }],
              });
            }
          } else {
            fields[0].names.push({ name: document.name, document });
          }
        });

        this.stateGroups = fields;
      });
  }

  optionSelected(value) {
    console.log('optionSelected()', value);
    this.selectedDocument = value;
  }

  displayFn(val) {
    return (val && val._id) ? val.name : val;
  }

  documentCreated(document: CmsDocument) {
    console.log('WidgetsDataControllerComponent#documentCreated()', document);
    this.selectedDocument = document;
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({
          letter: group.letter,
          names: _filter(group.names, value)
        }))
        .filter((group) => {
          if (!group.names.length) {
            this.selectedDocument = null;
            this.selectedDocumentField = null;
          }
          return group.names.length > 0;
        });
    }

    return this.stateGroups;
  }

  returnDocumentFieldData() {
    this.dataSelected(this.selectedDocumentField.value);
  }

}
