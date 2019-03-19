import { Component, OnInit, Input } from '@angular/core';

// Interfaces
import { Widget } from '../../interfaces/widget';
import { WidgetPlayerContainer } from './widget-player-container';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-player-container',
  templateUrl: './widget-player-container.component.html',
  styleUrls: ['./widget-player-container.component.css']
})
export class WidgetPlayerContainerComponent
       implements WidgetPlayerContainer, OnInit {
  @Input() widget: Widget;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  prepareFieldValue(): SafeHtml {
    if (this.widget.context && this.widget.context.field) {
      return this.sanitizer.bypassSecurityTrustHtml(this.widget.context.field.value);
    }

    return 'Field not selected';
  }

}
