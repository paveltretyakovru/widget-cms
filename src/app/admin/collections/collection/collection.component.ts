import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Collection } from './collection';
import { Model } from '../../models/model/model';
import { ActivatedRoute } from '@angular/router';
import { CmsDocument } from '../../documents/document/cms-document';
import { from, Observable, isObservable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  form: FormGroup;
  models: Model[];
  documents: CmsDocument[];
  collection: Collection;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.createForm();
    this.fetchModels();

    if (this.route.snapshot.params.id) {
      this.fetchCollection(this.route.snapshot.params.id);
    }
  }

  fetchModels(): void {
    this.api.getAll$('models')
      .subscribe((models: Model[]) => this.models = models);
  }

  fetchCollection(id: string): void {
    this.api.getById$('collections', id).subscribe((collection: Collection) => {
      console.log('CollectionComponent#fetchCollection()', { collection });
      this.documents = collection.documents;
      this.collection = collection;
      this.form.patchValue(collection);
    });
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      modelId: new FormControl(''),
    });
  }

  save(): void {
    console.log('CollectionComponent#save()', this.form.value);
    this.api.update$('collections', this.collection.id, this.form.value)
      .subscribe((collection) => this.collection = collection);
  }

  submit(): void {
    console.log('CollectionComponent#submit()', this.form.value);
    this.api.create$('collections', this.form.value)
      .subscribe((collection) => this.collection = collection);
  }

  onClickDocumentRow($event) {
    console.log('CollectionComponent#..rowClick()', { $event });
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: {
        _id: $event._id || '',
        name: $event.name || '',
        title: 'Change document',
        dialog: true,
        fields: $event.fields,
        collectionId: this.collection._id,

        model: this.models.find((model) => (
          model._id === this.form.get('modelId').value
        )),
      },
    });

    dialogRef.afterClosed().subscribe((result: Observable<any>) => {
      if (isObservable(result)) {
        result.subscribe((document: CmsDocument) => {
          Object.assign(
            this.documents.find(doc => doc._id === document._id),
            document
          );
        });
      }
    });
  }

  openAddDocumentDialog() {
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: {
        title: 'Add document to collection',
        dialog: true,
        collectionId: this.collection._id,

        model: this.models.find((model) => (
          model._id === this.form.get('modelId').value
        )),
      },
    });

    dialogRef.afterClosed().subscribe((result: Observable<any>) => {
      if (isObservable(result)) {
        result.subscribe((document: CmsDocument) => {
          this.documents.unshift(document);
          this.documents = [...this.documents];
        });
      }
    });
  }
}
