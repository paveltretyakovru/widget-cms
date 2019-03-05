import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { ApiService } from 'src/app/shared/services/api.service';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  model;
  form: FormGroup;
  fieldTypes = [
    { name: 'string', label: 'String' },
    { name: 'text', label: 'Text' },
    { name: 'nubmer', label: 'Number' },
  ];
  get formData() { return this.form.get('fields'); }

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private models: ModelsService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.fetchModel();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(''),
      fields: new FormArray([
        new FormGroup({
          fieldName: new FormControl(''),
          fieldType: new FormControl('string'),
        }),
      ]),
    });
  }

  addNext() {
    (this.form.controls['fields'] as FormArray).push(this.createItem())
  }

  createItem() {
    return new FormGroup({
      fieldName: new FormControl(''),
      fieldType: new FormControl('string'),
    });
  }

  submit() {
    this.models.create(this.form.value)
      .subscribe((model) => {
        console.log('ModelComponent submit form', model);
      });
  }

  save() {
    this.api.update$('models', this.model.id, this.form.value)
      .subscribe((model) => {
        console.log('ModelComponent#save().subscribe', model);
      });
  }

  fetchModel() {
    if (this.route.snapshot.params.id) {
      console.log('ModelComponent#ngOnInit.id:', this.route.snapshot.params.id);
      this.api.getById$('models', this.route.snapshot.params.id)
        .subscribe((model) => {
          console.log('ModelComponent#ngOnInit.subscribe', { model });

          this.model = model;
          const fields = this.form.get('fields') as FormArray;

          while (fields.length) {
            fields.removeAt(0);
          }

          this.form.patchValue({ name: model.name });

          model.fields.forEach((field) => fields.push(
            new FormGroup({
              fieldName: new FormControl(field.fieldName),
              fieldType: new FormControl(field.fieldType),
            })
          ));
      });
    }
  }
}
