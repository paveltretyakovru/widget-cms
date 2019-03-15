import {
  Component, OnInit, Input, ViewChild, ViewChildren, OnDestroy,
  ViewContainerRef, QueryList, AfterViewInit, ComponentFactoryResolver, Output, EventEmitter
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { makeId } from 'src/app/shared/helpers/make-id';
import { NgxWidgetGridComponent } from 'ngx-widget-grid';
import { WidgetContainerComponent, WidgetContainerOptions, CmsWidgetConfig } from '../widget-container/widget-container.component';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss']
})
export class WidgetEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() widgetCompleted = new EventEmitter<WidgetContainerOptions>(null);

  @ViewChild('widgetEditorGrid') grid: NgxWidgetGridComponent;
  @ViewChildren('widgetsEditorList', {read: ViewContainerRef })
  widgetsList: QueryList<ViewContainerRef>;

  private _options = new BehaviorSubject<any>(null);
  @Input()
    get options () { return this._options.getValue(); }
    set options (value) {
      this._options.next(value);
    }

  public rows = 6;
  public cols = 6;
  public widgets: any[] = [];
  public editable = true;
  public showGrid = true;
  public minHeight = 500;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this._options.subscribe((options) => {
      if (options) {
        this.addWidget(options);
      }
    });
  }

  ngAfterViewInit() {
    this.initWidgetsListChangeWatcher();
  }

  ngOnDestroy() {
    for (let i = 0; i < this.widgets.length; i++) {
      const widget = this.widgets[i];

      if (widget.factory) {
        widget.factory.changeDetectorRef.detach();
      }
    }
  }

  addWidget(options = null) {
    const nextPosition = this.grid.getNextPosition();

    if (nextPosition) {
      this.widgets.push({
        id: `widget-${makeId()}`,
        view: null,
        config: { ...nextPosition, ...options, width: 10, height: 10 },
        component: WidgetContainerComponent,
        // component: WidgetEditorComponent,
      });
    } else {
      console.warn('No Space Available!! ');
    }
  }

  initWidgetsListChangeWatcher() {
    // When widget grid have updated
    this.widgetsList.notifyOnChanges = () => {
      for (let i = 0; i < this.widgets.length; i++) {
        const widget = this.widgets[i];

        // If vidget don't have touched widget view
        if (!widget.view) {
          // Search widget view with widget id
          const view = this.widgetsList.find((item) => {
            return widget.id === item.element.nativeElement.id;
          });

          if (view) {
            widget.view = view;

            const factory = this.componentFactoryResolver
              .resolveComponentFactory(widget.component);

            this.ngOnDestroy();

            // Insert widget component to the widget
            widget.factory = view.createComponent(factory);
            widget.factory.instance.options = widget.config;
            widget.factory.changeDetectorRef.detectChanges();

            // (<WidgetContainerComponent>widget.factory.instance).options = { value: 'test' };
          }
        }
      }
    };
  }

  askDeleteWidget(index) {
    this.widgets.splice(index, 1);
  }

  completeWidget() {
    const config: WidgetContainerOptions = {
      type: 'widget',
      widgetConfig: {
        cols: this.cols,
        rows: this.rows,
        minHeight: this.minHeight,
        widgets: this.widgets.map((widget) => ({ config: widget.config })),
      }
    };

    this.widgetCompleted.emit(config);
  }

}
