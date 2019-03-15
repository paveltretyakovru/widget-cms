import {
  Component, OnInit, ViewChild, ViewChildren, ViewContainerRef,
  QueryList, ComponentFactoryResolver, AfterViewInit, OnDestroy, Input
} from '@angular/core';
import { NgxWidgetGridComponent } from 'ngx-widget-grid';
import { BehaviorSubject } from 'rxjs';
import { WidgetContainerOptions, WidgetContainerComponent } from '../widget-container/widget-container.component';
import { makeId } from 'src/app/shared/helpers/make-id';

@Component({
  selector: 'app-widget-viewer',
  templateUrl: './widget-viewer.component.html',
  styleUrls: ['./widget-viewer.component.scss']
})
export class WidgetViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('widgetViewerGrid') grid: NgxWidgetGridComponent;
  @ViewChildren('widgetsViewerList', {read: ViewContainerRef })
    widgetsViewerList: QueryList<ViewContainerRef>;

  private _options = new BehaviorSubject<any>(null);
  @Input()
    get options () { return this._options.getValue(); }
    set options (value) {
      this._options.next(value);
    }

  public rows = 12;
  public cols = 12;
  public widgets: any[] = [];
  public editable = false;
  public showGrid = false;
  public minHeight = 500;
  public swapWidgets = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initWidgetsListChangeWatcher();

    this._options.subscribe((options: WidgetContainerOptions): void => {
      if (options && options.widgetConfig) {
        this.cols = options.widgetConfig.cols;
        this.rows = options.widgetConfig.rows;
        this.minHeight = options.widgetConfig.minHeight;

        console.log('Goted widgets in the widget viewr', options.widgetConfig.widgets);

        options.widgetConfig.widgets.forEach((widget) => this.addWidget(widget));
      }
    });
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
    this.widgets.push({
      id: `widget-${makeId()}`,
      view: null,
      config: { ...options.config },
      component: WidgetContainerComponent,
    });
  }

  initWidgetsListChangeWatcher() {
    // When widget grid have updated
    this.widgetsViewerList.notifyOnChanges = () => {
      for (let i = 0; i < this.widgets.length; i++) {
        const widget = this.widgets[i];

        // If vidget don't have touched widget view
        if (!widget.view) {
          // Search widget view with widget id
          const view = this.widgetsViewerList.find((item) => {
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
}
