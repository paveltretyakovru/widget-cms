import { Component, OnInit } from '@angular/core';
import { Observable, isObservable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { CmsDocument } from '../document/cms-document';
import { Model } from '../../models/model/model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  models: Model[] = [];
  documents = [];
  documents$: Observable<any>;

  constructor(
    private api: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.documents$ = this.api.getAll$('documents');

    this.documents$.subscribe(documents => this.documents = documents);
    this.api.getAll$('models').subscribe(models => this.models = models);
  }

  onClickRowDatatable($event: CmsDocument) {
    console.log('DocumentListComponent#.rowClick()', { $event });

    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: {
        _id: $event._id || '',
        name: $event.name || '',
        title: 'Change document',
        dialog: true,
        fields: $event.fields,
        collectionId: $event.collectionId,
        model: this.models.find((model) => model._id === $event.modelId),
      },
    });

    dialogRef.afterClosed().subscribe((result: Observable<any> | string) => {
      if (isObservable(result)) {
        result.subscribe((document: CmsDocument) => {
          const tableDoc = this.documents.find(doc => doc._id === document._id);

          console.log('After close ===> ', { tableDoc, docuemnts: this.documents, document });

          if (tableDoc) {
            Object.assign(tableDoc, document);
          }

          this.documents = [ ...this.documents ];
        });
      } else if (result === 'removed document') {
        this.ngOnInit();
      }
    });
  }
}
