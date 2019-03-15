import { Component, Input, ViewEncapsulation, OnInit, } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CmsDocument } from 'src/app/admin/documents/document/cms-document';

export interface CmsWidgetConfig {
  top: number;
  left: number;
  width: number;
  height: number;
  document: CmsDocument;
  fieldName: string;
}

/**
 * @param {String} [type=field | widget] - Type of widget content
 * @param {CmsDocument=} [document] - Document with data
 * @param {String=} [fieldName] - Document field name with data
 * @param {Object=} [widgetConfig] - Config to
 *  @param {Number} [widgetConfig.cols]
 *  @param {Number} [widgetConfig.rows]
 *  @param {Number} [widgetConfig.minHeight]
 */
export interface WidgetContainerOptions {
  type: string;
  document?: CmsDocument;
  fieldName?: string;
  widgetConfig?: {
    cols: number;
    rows: number;
    minHeight: number;
    widgets: {
      config: CmsWidgetConfig;
    }[];
  };
}

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WidgetContainerComponent implements OnInit {
  private _options = new BehaviorSubject<WidgetContainerOptions>(null);

  @Input() parentSubject: Subject<any>;

  @Input()
    get options (): WidgetContainerOptions { return this._options.getValue(); }
    set options (value: WidgetContainerOptions) {
      this._options.next(value);
    }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this._options.subscribe((options: WidgetContainerOptions): void => {});
  }

  prepareHtmlValue(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
