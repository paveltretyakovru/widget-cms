import { Component, OnInit, Input } from '@angular/core';
import { WidgetEditorContainer } from './widget-editor-container';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Widget } from '../../../widget';
import { WidgetEditorConfiguration } from '../../../widget-editor';
import { makeId } from 'src/app/shared/helpers/make-id';

@Component({
  selector: 'app-widget-editor-container',
  templateUrl: './widget-editor-container.component.html',
  styleUrls: ['./widget-editor-container.component.scss']
})
export class WidgetEditorContainerComponent implements WidgetEditorContainer, OnInit {
  @Input() widget: Widget;
  @Input() widgets: Widget[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.widget && this.widget.type === 'group') {
      this.widgets = this.prepareWidgetsForEditor();
    }
  }

  // TODO: Add to interface
  prepareWidgetEditorConfiguration(): WidgetEditorConfiguration {
    if (this.widget) {
      const { width, height } = this.widget.size;
      const { width: cols, height: rows } = this.widget.position;

      return {
        rows,
        cols,
        width: `${width}px`,
        height: `${height}px`,
        movable: false,
        editable: false,
        showGrid: true,
        showPanel: false,
        resizable: false,
      };
    }
  }

  prepareWidgetsForEditor(): Widget[] {
    return this.widget.content.widgets.map((widget) => {
      return {
        id: `widget-${makeId()}`,
        ref: null,
        size: widget.size,
        type: widget.type,
        content: widget.content,
        factory: null,
        position: widget.position,
        container: null,
      };
    });
  }

  preapreFieldValue(): SafeHtml {
    if (this.widget && this.widget.type === 'field' && this.widget.content) {
      this.sanitizer.bypassSecurityTrustHtml(
        this.widget.content.field.value
      );
    }

    return 'THere is no selected field';
  }
}
