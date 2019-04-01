import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { PageModel } from 'src/app/admin/pages/page/page.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: PageModel;
  widgets = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const list = this.route.snapshot.params.list;
    const document = this.route.snapshot.params.document;

    if (id) {
      const params = (document) ? { document } : {};

      this.api.getById$('pages', id, { params: params })
        .subscribe((page) => {
          console.log('Fetched page model', page, list);
          this.page = { ...page };
          this.widgets = page.widgets;
        });
    }
  }

}
