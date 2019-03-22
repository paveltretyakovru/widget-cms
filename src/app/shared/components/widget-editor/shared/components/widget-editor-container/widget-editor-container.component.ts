import { Component, OnInit, Input } from '@angular/core';
import { WidgetEditorContainer, WidgetEditorContainerConfiguration } from './widget-editor-container';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-editor-container',
  templateUrl: './widget-editor-container.component.html',
  styleUrls: ['./widget-editor-container.component.scss']
})
export class WidgetEditorContainerComponent implements WidgetEditorContainer, OnInit {
  @Input() configuration: WidgetEditorContainerConfiguration;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {}

  preapreFieldValue(): SafeHtml {
    const { widget } = this.configuration;

    if (widget && widget.type === 'field' && widget.content) {
      this.sanitizer.bypassSecurityTrustHtml(
        this.configuration.widget.content.field.value
      );
    }

    return 'THere is no selected field';
  }
}
