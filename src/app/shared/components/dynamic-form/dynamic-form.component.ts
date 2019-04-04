import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ApiService } from '../../services/api.service';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';
import { DynamicFormComponentInterface, DynamicFormOptions, DynamicFormField } from './dynamic-form.interface';
import { Collection } from 'src/app/admin/collections/collection/collection';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent
       implements OnInit, DynamicFormComponentInterface {
  title = '';
  dialog: boolean;
  fields: DynamicFormField[] = [];
  options: DynamicFormOptions;
  specificFields: DynamicFormField[] = [];

  private _propertyOptions = new BehaviorSubject<DynamicFormOptions>(null);
  @Input()
    get propertyOptions() { return this._propertyOptions.getValue(); }
    set propertyOptions(value: DynamicFormOptions) {
      this._propertyOptions.next(value);
    }

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public matDialogOptions: DynamicFormOptions) {
  }

  ngOnInit() {
    this.prepareOptions();

    // If we are working with document, then we add collection field
    if (this.options.model) {
      this.api.getAll$('collections')
        .subscribe((collections: Collection[]) => {
          const currentModelCollections = collections.filter((collection) => {
            return collection.modelId === this.options.model._id;
          });

          const collectionField = {
            name: 'collection',
            type: 'select',
            data: currentModelCollections,
            value: this.options.collectionId,
          };

          this.pushToFields([collectionField], true);
        });
    }
  }

  prepareOptions() {
    if (this.matDialogOptions) {
      this.options = this.matDialogOptions;
      this.prepareFields();
      this.title = this.options.title || '';
      this.dialog = !!this.options.dialog;
    } else {
      this._propertyOptions.subscribe((options: DynamicFormOptions) => {
        if (options) {
          this.options = options;
          this.prepareFields();
          this.title = this.options.title || '';
          this.dialog = !!this.options.dialog;
        }
      });
    }
  }

  prepareFields() {
    const { fields, model } = this.options;
    const nameField = {
      name: 'document name',
      type: 'string',
      value: this.options.name || '',
    };

    this.pushToFields(fields ? fields : []);
    this.pushToFields((model && model.fields) ? model.fields : []);

    // If model exists that working with document and that need document field
    this.pushToFields((model) ? [nameField] : [], true);
  }

  pushToFields (src: DynamicFormField[] = [], specific = false) {
    const toFields = (specific) ? this.specificFields : this.fields;

    toFields
      .push(...src
        .filter((field) => !toFields.find(item => item.name === field.name))
        .map((field) => ({ ...field, value: field.value || '' }))
      );
  }

  dialogClickYesHandler(): DynamicFormOptions | Observable<CmsDocument> {
    const { options, specificFields, fields } = this;

    // If working with document data then send request to crate new document
    if (options && options.model && options.model._id) {
      const nameField = specificFields.find(el => el.name === 'document name');
      const collectionField = specificFields.find(el => el.name === 'collection');

      // Calc collection id to post document updates
      let collectionId = options.collectionId ? options.collectionId : null;
      if (collectionField) {
        collectionId = collectionField.value;
      }

      const requestData: CmsDocument = {
        name: (nameField) ? nameField.value : 'no name document',
        fields: fields.map(({ name, type, value }) => ({ name, type, value })),
        modelId: options.model._id,
        collectionId,
      };

      // And return Observable request to create or update CMSDocuemnt
      return !!this.options._id
        ? this.api.update$('documents', this.options._id, requestData)
        : this.api.create$('documents', requestData);
    }

    // // Else we should return updated data to continue working with data
    return this.options;
  }

  onRemovedDocument() {
    this.dialogRef.close('removed document');
  }

  dialogClickNoHandler() {
    this.dialogRef.close();
  }

  disableField(field) {
    switch (field.name) {
      case '_id': return true;
      default: return false;
    }
  }
}
