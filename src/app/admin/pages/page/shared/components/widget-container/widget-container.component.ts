import { Component, Input, ViewEncapsulation, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetContainerComponent {

  private _options = new BehaviorSubject<any>(null);

  @Input()
    get options () { return this._options.getValue(); }
    set options (value) {
      this._options.next(this.sanitizer.bypassSecurityTrustHtml(value));
    }

  constructor(private sanitizer: DomSanitizer) {}

}
