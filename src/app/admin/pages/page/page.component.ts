import { Component, OnInit } from '@angular/core';
import { WidgetBackbone } from 'src/app/shared/components/grid/interfaces/widget';
import { WidgetsUpdatedResult, GridData, INIT_GRID_DATA } from 'src/app/shared/components/grid/grid.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: { name: string, widgets: WidgetBackbone[], data: GridData } = {
    name: 'Untiteled',
    data: INIT_GRID_DATA,
    widgets: [],
  };

  constructor() { }

  ngOnInit() {
  }

  // =========================================================
  //                   Events
  //  ========================================================
  onClickSavePage() {
    console.log('onClickSavePage', this.page);
  }

  onWidgetsUpdated({ widgets, data }: WidgetsUpdatedResult) {
    this.page.data = data;
    this.page.widgets = widgets;
  }
}
