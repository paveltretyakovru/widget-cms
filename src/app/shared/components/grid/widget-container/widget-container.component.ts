import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetBackbone } from '../interfaces/widget';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss']
})
export class WidgetContainerComponent implements OnInit {
  _content = new BehaviorSubject<any>([]);
  @Input()
    get content() { return this._content.getValue(); }
    set content(content) { this._content.next(content); }

  constructor() { }

  ngOnInit() {
    this._content.subscribe((content) => {
      console.log('WidgetContainerComponent#_widgets.subscribe', { content });
    });
  }

}
