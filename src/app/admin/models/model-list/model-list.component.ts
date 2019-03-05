import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  models = [];
  models$: Observable<any>;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.models$ = this.api.getAll$('models');
  }

  onClickRowDatatable(model) {
    console.log('Clicked on datatable row', model);
    this.router.navigate([`/admin/models/${model._id}`]);
  }
}
