import { Component, OnInit, ElementRef, Input, OnDestroy, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef } from '@angular/core';
import { Widget } from '../widget';
import { BehaviorSubject } from 'rxjs';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widgets-container',
  templateUrl: './widgets-container.component.html',
  styleUrls: ['./widgets-container.component.scss']
})
export class WidgetsContainerComponent
       implements OnInit {

  _widget = new BehaviorSubject<Widget>(null);
  @Input()
    get widget() { return this._widget.getValue(); }
    set widget(widget) { this._widget.next(widget); }

  constructor(
    public elRef: ElementRef,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() { }

  prepareFieldValue(): SafeHtml {
    if (this.widget && this.widget.type === 'field') {
      return this.sanitizer.bypassSecurityTrustHtml(
        this.widget.field.value
      );
    }

    return 'THere is no selected field';
  }
}
