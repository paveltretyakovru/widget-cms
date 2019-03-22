import { Component, OnInit, Input } from '@angular/core';
import { WidgetEditorContainer } from './widget-editor-container';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Widget } from '../../../widget';

@Component({
  selector: 'app-widget-editor-container',
  templateUrl: './widget-editor-container.component.html',
  styleUrls: ['./widget-editor-container.component.scss']
})
export class WidgetEditorContainerComponent implements WidgetEditorContainer, OnInit {
  @Input() widget: Widget;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {}

  preapreFieldValue(): SafeHtml {
    if (this.widget && this.widget.type === 'field' && this.widget.content) {
      this.sanitizer.bypassSecurityTrustHtml(
        this.widget.content.field.value
      );
    }

    return 'THere is no selected field';
  }
}
