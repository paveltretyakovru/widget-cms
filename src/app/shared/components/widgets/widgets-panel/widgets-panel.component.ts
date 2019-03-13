import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { makeId } from 'src/app/shared/helpers/make-id';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-headline-component-control',
  template: `
    <div>
      <h2 class="mat-title">Headline widget settings</h2>

      <app-widgets-data-controller>
      </app-widgets-data-controller>
    </div>
  `
})
export class HeadlineControlComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('HeadlineControlComponent#constructor()', { data });
  }
}

@Component({
  selector: 'app-my-foo',
  template: `
    <div>
      Headline component 1
    </div>
  `
})
export class HeadlineComponent {
  widget = { top: 1, left: 1, height: 1, width: 2, color: 'rgba(0,0,0,.0)'};
  editable = true;
}

@Component({
  selector: 'app-widgets-panel',
  templateUrl: './widgets-panel.component.html',
  styleUrls: ['./widgets-panel.component.scss']
})
export class WidgetsPanelComponent implements OnInit {
  @Output() addedWidget = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addWidgetHandler() {
    console.log('WidgetPanelComponent#addWidgetHandler()');
    this.addedWidget.emit({
      id: `widget-${makeId()}`,
      control: HeadlineControlComponent,
      component: HeadlineComponent,
    });
  }

}
