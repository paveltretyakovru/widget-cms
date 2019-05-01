import { Component, OnInit } from '@angular/core';
import { WidgetBackbone } from 'src/app/shared/components/grid/shared/interfaces/widget';
import { WidgetsUpdatedResult, GridData, INIT_GRID_DATA } from 'src/app/shared/components/grid/grid.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

export interface PageModel {
  _id?: string;
  name: string;
  widgets: WidgetBackbone[];
  data: GridData;
  size: {
    cols: number;
    rows: number;
    width: number;
    height: number;
  };
}

const DEFAULT_PAGE_MODEL = {
  name: 'Untiteled',
  data: INIT_GRID_DATA,
  widgets: [],
  size: {
    cols: 56,
    rows: 56,
    height: 900,
    width: 1200
  }
};

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

    if (id) {
      this.api.getById$('pages', id)
        .subscribe((page) => {
          console.log('Fetched page model', page);
          this.page = { ...page };
          this.widgets = page.widgets;
        });
    } else {
      this.page = { ...DEFAULT_PAGE_MODEL };
      this.widgets = DEFAULT_PAGE_MODEL.widgets;
    }
  }

  // =========================================================
  //                   Events
  //  ========================================================
  onClickSavePage() {
    const { name, widgets, size, _id } = this.page;
    if (!_id) {
      this.api.create$('pages', { name, widgets, size })
        .subscribe((page) => {
          console.log('Page was created', { page });
          this.page._id = page._id;
          // this.page = { ...page };
          // this.widgets = page.widgets;
        });
    } else {
      this.api.update$('pages', _id, { name, widgets, size })
        .subscribe((page) => console.log('Page was saved', { page }));
    }
  }

  onWidgetsUpdated({ widgets, data, size }: WidgetsUpdatedResult) {
    this.page.size = size;
    this.page.data = data;
    this.page.widgets = widgets;
  }
}
