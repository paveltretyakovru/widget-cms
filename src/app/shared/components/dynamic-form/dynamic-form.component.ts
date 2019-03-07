import { Observable } from 'rxjs';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ApiService } from '../../services/api.service';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { DynamicFormComponentInterface, DynamicFormOptions, DynamicFormField } from './dynamic-form.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent
       implements OnInit, DynamicFormComponentInterface {
  title = '';
  dialog: boolean;
  fields: DynamicFormField[] = [];
  options: DynamicFormOptions;
  specificFields: DynamicFormField[] = [];

  @Input() propertyOptions: DynamicFormOptions;

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogOptions: DynamicFormOptions) {
  }

  ngOnInit() {
    this.prepareOptions();
    this.prepareFileds();
    this.title = this.options.title || '';
    this.dialog = !!this.options.dialog;
  }

  prepareOptions() {
    this.options = (this.matDialogOptions)
      ? this.matDialogOptions
      : this.propertyOptions;
  }

  prepareFileds() {
    const { fields, model } = this.options;
    const nameField = { name: 'document name', type: 'string', value: '' };

    const pushToFields = (arr: DynamicFormField[] = [], specific = false) => {
      ((specific) ? this.specificFields : this.fields)
        .push(...arr.map((field) => ({ ...field, value: field.value || '' }))
      );
    };

    pushToFields(fields ? fields : []);
    pushToFields((model && model.fields) ? model.fields : []);

    // If model exists that working with document and that need document field
    pushToFields((model) ? [nameField] : [], true);
  }

  dialogClickYesHandler(): DynamicFormOptions | Observable<CmsDocument> {
    const { options, specificFields, fields } = this;

    // If working with document data then send request to crate new document
    if (options && options.model && options.model._id) {
      const nameField = specificFields.find(el => el.name === 'document name');

      const requestData: CmsDocument = {
        name: (nameField) ? nameField.value : 'no name document',
        modelId: options.model._id,
        collectionId: options.collectionId ? options.collectionId : null,
        fields: fields.map(({ name, value }) => ({ name, value })),
      };

      // And return Observable request to create CMSDocuemnt
      return this.api.create$('documents', requestData);
    }

    // // Else we should return updated data to continue working with data
    return this.options;
  }

  dialogClickNoHandler() {
    this.dialogRef.close();
  }
}
