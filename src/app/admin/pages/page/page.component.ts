import { Component, OnInit } from '@angular/core';
import { WidgetBackbone } from 'src/app/shared/components/grid/interfaces/widget';
import { WidgetsUpdatedResult, GridData, INIT_GRID_DATA } from 'src/app/shared/components/grid/grid.component';
import { ApiService } from 'src/app/shared/services/api.service';

interface PageModel {
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

// tslint:disable-next-line
const TEST_WIDGETS_DATA = '[{"size":{"width":438,"height":402},"content":{"field":{"id":"5c88f8560e69cc22cf0ab0e8","documentId":"5c898eee51e8b4554cd098be"}},"position":{"top":1,"left":1,"width":5,"height":8}},{"size":{"width":525,"height":502},"content":{"field":{"id":"5c89842a51e8b4554cd098bb","documentId":"5c883c1c7637cd62255ad655"}},"position":{"top":1,"left":7,"width":6,"height":12}}]';
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
  page: PageModel = DEFAULT_PAGE_MODEL;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  // =========================================================
  //                   Events
  //  ========================================================
  onClickSavePage() {
    console.log('onClickSavePage', this.page);

    const { name, widgets, size } = this.page;
    this.api.create$('pages', { name, widgets, size })
      .subscribe((page) => {
        console.log('Page Component subscribe to save', { page });
      });
  }

  onWidgetsUpdated({ widgets, data, size }: WidgetsUpdatedResult) {
    this.page.size = size;
    this.page.data = data;
    this.page.widgets = widgets;
  }
}
