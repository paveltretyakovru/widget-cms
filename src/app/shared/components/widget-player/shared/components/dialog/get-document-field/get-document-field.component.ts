import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';

import { ApiService } from 'src/app/shared/services/api.service';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';

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
  selector: 'app-get-document-field',
  templateUrl: './get-document-field.component.html',
  styleUrls: ['./get-document-field.component.scss']
})
export class GetDocumentFieldComponent implements OnInit {
  @Output() fieldSelected: EventEmitter<any> = new EventEmitter<any>();

  stateForm: FormGroup = this.fb.group({ stateGroup: '' });
  stateGroups: StateGroup[] = [];
  selectedDocument: CmsDocument;
  stateGroupOptions: Observable<StateGroup[]>;

  _selectedField = new BehaviorSubject<any>(null);
  get selectedField() { return this._selectedField.getValue(); }
  set selectedField(value) { this._selectedField.next(value); }

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.fetchDocuments();

    this.stateGroupOptions = this.stateForm.get('stateGroup').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

    this._selectedField.subscribe((field: CmsDocumentField) => {
      if (field) {
        this.fieldSelected.emit(field);
      }
    });
  }

  fetchDocuments() {
    this.api.getAll$('documents')
      .subscribe((documents) => {
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
    this.selectedDocument = value;
  }

  displayFn(val) {
    return (val && val._id) ? val.name : val;
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
            this.selectedField = null;
          }
          return group.names.length > 0;
        });
    }

    return this.stateGroups;
  }
}
