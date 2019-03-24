import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss']
})
export class WidgetContainerComponent {
  _content = new BehaviorSubject<any>([]);
  @Input()
    get content() { return this._content.getValue(); }
    set content(content) { this._content.next(content); }

  constructor() { }
}
