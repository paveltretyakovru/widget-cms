import { Component, OnInit } from '@angular/core';
import { WidgetBackbone } from 'src/app/shared/components/grid/interfaces/widget';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: { name: string } = {
    name: 'Untiteled',
  };

  constructor() { }

  ngOnInit() {
  }

  onClickSavePage() {
    console.log('onClickSavePage');
  }

  onWidgetsUpdated(widgets: WidgetBackbone[]) {
    console.log('[PAGE] widgetsUpdated', widgets);
  }
}
