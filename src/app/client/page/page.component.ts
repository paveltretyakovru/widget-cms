import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { PageModel } from 'src/app/admin/pages/page/page.component';
import { Title } from '@angular/platform-browser';

export interface PageComponentInterface {
  setPageHeaderTitle(): void;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements PageComponent, OnInit {
  page: PageModel;
  widgets = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private titleService: Title,
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
    } else {
      // If id is not exists try to get index page from indexPage config
      this.api.getAll$('configs')
        .subscribe((configs) => {
          const indexPage = configs.find(config => config.name === 'indexPage');

          if (indexPage && indexPage.value) {
            this.api.getById$('pages', indexPage.value)
              .subscribe((page) => {
                console.log('Fetched page model', page, list);
                this.page = { ...page };
                this.widgets = page.widgets;

                // Update header title
                this.setPageHeaderTitle();
              });
          }
        });
    }
  }

  setPageHeaderTitle() {
    if (this.page && this.page.name) {
      this.titleService.setTitle(this.page.name);
    }
  }

}
