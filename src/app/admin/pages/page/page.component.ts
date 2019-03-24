import { Component, OnInit } from '@angular/core';
import { WidgetBackbone } from 'src/app/shared/components/grid/interfaces/widget';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: { name: string, widgets: WidgetBackbone[] } = {
    name: 'Untiteled',
    widgets: [],
  };

  constructor() { }

  ngOnInit() {
  }

  // =========================================================
  //                   Events
  //  ========================================================
  onClickSavePage() {
    console.log('onClickSavePage');
  }

  onWidgetsUpdated(widgets: WidgetBackbone[]) {
    this.page.widgets = widgets;
  }
}
