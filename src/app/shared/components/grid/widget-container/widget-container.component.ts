import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) { }

  prepareFieldValue(): SafeHtml {
    console.log('prepareFieldValue()', this.content);
    if (this.content && this.content.field.value) {
      return this.sanitizer.bypassSecurityTrustHtml(this.content.field.value);
    }

    return 'Field not selected';
  }
}
