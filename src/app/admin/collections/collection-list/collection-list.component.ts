import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from '../collection/collection';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  collections$: Observable<Collection[]>;

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.collections$ = this.api.getAll$('collections');
  }

  onClickRowDatatable(model) {
    console.log('Clicked on datatable row', model);
    this.router.navigate([`/admin/collections/${model._id}`]);
  }
}
