import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgxEditorConfigInterface } from 'src/app/shared/interfaces/ngx-editor-config.interface';
import { makeId } from 'src/app/shared/helpers/make-id';
import { ApiService } from 'src/app/shared/services/api.service';
import { Model } from 'src/app/admin/models/model/model';
import { Observable } from 'rxjs';
import { CmsDocument, EMPTY_CMS_DOCUMENT } from 'src/app/admin/documents/document/cms-document';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CmsDocumentField, EMPTY_CMS_DOCUMENT_FIELD } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';
import { GetDocumentFieldResult } from './get-document-field/get-document-field.component';

export interface FieldSheetComponentInterface {
  field: CmsDocumentField;
  models: Model[];
  document: CmsDocument;
  ngxEditorConfig: NgxEditorConfigInterface;

  createTextModel(): Observable<Model>;
  onFieldSelected($event: GetDocumentFieldResult): void;
  onClickButtonClear(): void;
  createTextDocument(modelOfText: Model): Observable<CmsDocument>;
  onClickButtonCreate(): void;
}

@Component({
  selector: 'app-field-sheet',
  templateUrl: './field-sheet.component.html',
  styleUrls: ['./field-sheet.component.scss']
})
export class FieldSheetComponent
       implements FieldSheetComponentInterface, OnInit {
  models = [];
  ngxEditorConfig = { minHeight: 310 };

  @Input() document = EMPTY_CMS_DOCUMENT;
  @Input() field: CmsDocumentField = EMPTY_CMS_DOCUMENT_FIELD;

  constructor(
    private api: ApiService,
    private bottomSheetRef: MatBottomSheetRef<FieldSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data
  ) { }

  ngOnInit() {
    this.api.getAll$('models').subscribe(models => this.models = models);

    console.log('FieldSheetComponent.data', { data: this.data });

    if (this.data && this.data.field) {
      this.field = this.data.field;
      console.log('SETED FIELD', this.field);
    }

    if (this.data && this.data.document) {
      this.document = this.data.document;
    }
  }

  // =========================================================
  // ~~~~~~~~~~~~~~~~~~~~~~~ Events ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // =========================================================
  onClickButtonCreate(): void {
    // Update exists document field
    if (this.field && this.field._id) {
      console.log('onClickButtonCreate', { field: this.field, document: this.document });

      this.api.update$('documents', this.document._id, this.document)
        .subscribe((document) => this.bottomSheetRef.dismiss({
          document,
          field: this.field,
        }));
    // Or create new document
    } else {
      // Search model of text
      const modelOfText = this.models.find(m => m.name === 'text');

      // If text model don't created earlier
      if (modelOfText) {
        // If model exists create text document
        this.createTextDocument(modelOfText)
          .subscribe((document: CmsDocument) => {
            this.bottomSheetRef.dismiss({
              field: document.fields[0],
              document,
            });
          });
      } else {
        // Else at first crate to text model
        this.createTextModel().subscribe((textModel) => {
          // ... and then create text document
          this.createTextDocument(textModel)
            .subscribe((document: CmsDocument) => {
              this.bottomSheetRef.dismiss({
                field: document.fields[0],
                document,
              });
            });
        });
      }
    }
  }

  onFieldSelected($event: GetDocumentFieldResult): void {
    this.field = $event.field;
    this.document = $event.document;
  }

  onClickButtonClear() {
    this.field = EMPTY_CMS_DOCUMENT_FIELD;
    this.document = EMPTY_CMS_DOCUMENT;
  }

  // =========================================================
  // ~~~~~~~~~~~~~~~~~~~~~~~ Methods ~~~~~~~~~~~~~~~~~~~~~~~~~
  // =========================================================
  createTextDocument(modelOfText): Observable<CmsDocument> {
    const textField = modelOfText.fields.find((field) => {
      return field.name === 'text';
    });

    const textModel: CmsDocument = {
      name: this.field.name,
      fields: [ { ...textField, value: this.field.value } ],
      modelId: modelOfText._id,
    };

    return this.api.create$('documents', textModel);
  }

  createTextModel(): Observable<Model> {
    return this.api.create$('models', {
      name: 'text',
      fields: [{
        name: 'text',
        type: 'text',
        value: null,
      }]
    });
  }
}
