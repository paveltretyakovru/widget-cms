import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// *ngFor="let widget of widgets;let $index = index;"

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
    this.addedWidget.emit(HeadlineComponent);
  }

}
