import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Collection } from './collection';
import { Model } from '../../models/model/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  form: FormGroup;
  models: Model[] | null;
  collection: Collection;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
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
    this.api.getById$('collections', id)
    .subscribe((collection: Collection) => {
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

}
