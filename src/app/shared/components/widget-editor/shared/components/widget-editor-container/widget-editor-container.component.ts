import { Component, OnInit, Input } from '@angular/core';
import { WidgetEditorContainer } from './widget-editor-container';
import { DefaultWidgetEditorConfiguration } from '../../../widget-editor';

@Component({
  selector: 'app-widget-editor-container',
  templateUrl: './widget-editor-container.component.html',
  styleUrls: ['./widget-editor-container.component.scss']
})
export class WidgetEditorContainerComponent implements WidgetEditorContainer, OnInit {
  @Input() configuration: any;

  constructor() { }

  ngOnInit() {
    this.configuration.widgetEditorConfiguration = DefaultWidgetEditorConfiguration;
  }

}
