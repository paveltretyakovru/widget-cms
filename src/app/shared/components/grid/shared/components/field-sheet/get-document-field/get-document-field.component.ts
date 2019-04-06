import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ApiService } from 'src/app/shared/services/api.service';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';
import { MatBottomSheetRef } from '@angular/material';

interface GroupName { name: string; document: any; }
interface StateGroup { letter: string; names: GroupName[]; }

@Component({
  selector: 'app-get-document-field',
  templateUrl: './get-document-field.component.html',
  styleUrls: ['./get-document-field.component.scss']
})
export class GetDocumentFieldComponent implements OnInit {
  stateForm: FormGroup = this.fb.group({ stateGroup: '' });
  stateGroups: StateGroup[];
  selectedDocument: CmsDocument;
  stateGroupOptions: Observable<StateGroup[]>;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private bottomSheetRef: MatBottomSheetRef<GetDocumentFieldComponent>
  ) { }

  ngOnInit() {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.api.getAll$('documents')
      .subscribe((documents) => {
        const fields = [{ letter: 'Single document', names: [] }];

        documents.forEach((document) => {
          if (document.collection) {
            const search = fields.find((field) => (
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

        this.stateGroupOptions = this.stateForm
          .get('stateGroup').valueChanges
          .pipe(startWith(''), map(value => this._filterGroup(value)));
      });
  }

  displayFn(val) { return (val && val._id) ? val.name : val; }

  // =========================================================
  //                        Events
  // =========================================================
  optionSelected(value) {
    this.selectedDocument = value;
  }

  onClickFieldValue(field: CmsDocumentField): void {
    console.log('onClickFieldValue()', field);
    this.bottomSheetRef.dismiss({ field, document: this.selectedDocument });
  }

  // =========================================================
  //                        Helpers
  // =========================================================
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({
          letter: group.letter,
          names: this._filter(group.names, value)
        }))
        .filter((group) => {
          if (!group.names.length) {
            this.selectedDocument = null;
          }
          return group.names.length > 0;
        });
    }

    return this.stateGroups;
  }

  private _filter(opt: GroupName[], value: any): GroupName[] {
    const filterValue = (typeof value === 'object')
      ? value.name.toLowerCase()
      : value.toLowerCase();

    return opt.filter(item => item.name.toLowerCase().includes(filterValue));
  }
}

