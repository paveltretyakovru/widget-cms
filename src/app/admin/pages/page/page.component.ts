import { Component, OnInit } from '@angular/core';
import { WidgetBackbone } from 'src/app/shared/components/grid/interfaces/widget';
import { WidgetsUpdatedResult, GridData, INIT_GRID_DATA } from 'src/app/shared/components/grid/grid.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

interface PageModel {
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
  // widgets: JSON.parse(TEST_WIDGETS_DATA),
  size: {
    cols: 12,
    rows: 12,
    height: 800,
    width: null
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
          this.page = { ...page };
          this.widgets = page.widgets;
        });
    } else {
      this.api.update$('pages', _id, { name, widgets, size })
        .subscribe((page) => {
          console.log('Page was saved', { page });
          this.page = { ...page };
          this.widgets = page.widgets;
        });
    }
  }

  onWidgetsUpdated({ widgets, data, size }: WidgetsUpdatedResult) {
    this.page.size = size;
    this.page.data = data;
    this.page.widgets = widgets;
  }
}
