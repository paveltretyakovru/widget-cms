import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetContainerComponent {
  @Input() editable = false;

  _content = new BehaviorSubject<any>([]);
  @Input()
    get content() { return this._content.getValue(); }
    set content(content) { this._content.next(content); }

  constructor(private sanitizer: DomSanitizer) { }

  prepareFieldValue(): SafeHtml {
    if (this.content && this.content.field.value) {
      return this.sanitizer.bypassSecurityTrustHtml(this.content.field.value);
    }

    return 'Field not selected';
  }
}
