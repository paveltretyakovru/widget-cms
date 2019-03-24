import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  pages$: Observable<any[]>;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pages$ = this.api.getAll$('pages');
  }

  onClickRowDatatable(model) {
    console.log('Clicked on datatable row', model);
    this.router.navigate([`/admin/pages/${model._id}`]);
  }
}
