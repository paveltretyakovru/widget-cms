import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Model } from 'src/app/admin/models/model/model';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';

interface Field {
  name: string;
  type: string;
  value: any;
}

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {
  private _name = new BehaviorSubject<string>(null);

  @Output() prepared: EventEmitter<CmsDocument> = new EventEmitter();
  @Input()
    get name () { return this._name.getValue(); }
    set name (value) { this._name.next(value); }

  model: Model;
  fields: Field[] = [];
  documentId = '';
  documentName = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this._name.subscribe((name) => {
      if (name) {
        this.api.get$(`/api/models/name/${name}`)
          .subscribe((model) => {
            if (model && model.fields) {
              this.model = model;
              this.fields = [ ...model.fields ];
            }
          });
      }
    });
  }

  save(): void {
    this.api.update$('documents', this.documentId, this.compareModel())
      .subscribe((document: CmsDocument) => this.prepared.emit(document));

  }

  create(): void {
    this.api.create$('documents', this.compareModel())
      .subscribe((document: CmsDocument) => this.prepared.emit(document));
  }

  compareModel(): CmsDocument {
    return {
      name: this.documentName,
      fields: this.fields,
      modelId: this.model._id,
    };
  }

  clear(): void {
    this.documentId = null;
    this.documentName = null;
    this.fields.forEach(field => field.value = null);
  }
}
