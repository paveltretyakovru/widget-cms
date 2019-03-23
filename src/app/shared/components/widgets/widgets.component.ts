import {
  Component, OnInit, ViewChild, QueryList, ViewChildren, ViewContainerRef,
  Input, ComponentFactoryResolver, Renderer2, AfterViewInit
} from '@angular/core';

import { WidgetPositionChange, NgxWidgetGridComponent } from 'ngx-widget-grid';
import { BehaviorSubject } from 'rxjs';

import { Widget, ROOT_WIDGET, createWidgetObject } from './widget';
import { WidgetsDialogComponent } from './widgets-dialog/widgets-dialog.component';
import { WidgetsContainerComponent } from './widgets-container/widgets-container.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit, AfterViewInit {
  // References
  @ViewChild('grid')
    grid: NgxWidgetGridComponent;

  @ViewChildren('widgetsRefs', { read: ViewContainerRef })
    widgetsRefs: QueryList<ViewContainerRef>;

  @Input() gridWidth;
  @Input() gridHeight = '300px';

  @Input() rows = 6;
  @Input() cols = 6;
  @Input() movable = true;
  @Input() showGrid = true;
  @Input() editable = true;
  @Input() showPanel = true;
  @Input() resizable = true;

  _widgets = new BehaviorSubject<Widget[]>([]);
  @Input()
    get widgets() { return this._widgets.getValue(); }
    set widgets(widgets) { this._widgets.next(widgets); }

  constructor(
    public dialog: MatDialog,
    private cfResolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) { }

  // ~~~~~~~~~~~~~~ LOOP EVENTS ~~~~~~~~~~~~~~
  ngOnInit() {
    // Subscribe to widgets array updates
    this._widgets.subscribe((widgets) => {
      console.log('Widgets subscribe', widgets);
    });
  }

  ngAfterViewInit() {
    this.setListenerToWidgetsRefChanges();
  }

  // ~~~~~~~~~~~~~~ COMPONENTS EVENTS ~~~~~~~~~~~~~~
  onClickAddWidget() {
    const nextPosition = this.grid.getNextPosition();
    const emptyWidget = createWidgetObject({type: 'empty'});
    const newWidget = { ...emptyWidget, ...nextPosition };

    console.log('Add widget', newWidget);

    this.widgets.push(newWidget);
  }

  onWidgetPositionChange($event: WidgetPositionChange): void {
     const widget = this.widgets[$event.index];

     widget.height = $event.newPosition.height;
     widget.width = $event.newPosition.width;
     widget.top = $event.newPosition.top;
     widget.left = $event.newPosition.left;

    this.prepareWidgets(this.widgets);
  }

  setListenerToWidgetsRefChanges(): void {
    this.widgetsRefs.notifyOnChanges = () => {
      this.widgets.forEach((widget) => {
        this.setWidgetRef(widget);
      });

      this.prepareWidgets(this.widgets);
    };
  }

  // ~~~~~~~~~~~~~~ METHODS ~~~~~~~~~~~~~~
  prepareWidgets(widgets: Widget[]) {
    widgets.forEach((widget) => {
      if (!widget.ref) {
        this.setWidgetRef(widget);
      }

      this.createWidgetContainer(widget);
      this.updateWidgetSize(widget);
    });
  }

  updateWidgetSize(widget: Widget) {
    if (widget.ref) {
      const {
        offsetWidth: width,
        offsetHeight: height,
      } = widget.ref.element.nativeElement;

      widget.size = { width, height };
      widget.factory.instance.widget = widget;
      widget.factory.changeDetectorRef.detectChanges();

      console.log('WIIIIIIIIIDGET SIZE', widget.size);
    }
  }

  setWidgetRef(widget: Widget) {
    widget.ref = this.widgetsRefs.find((ref) => {
      return ref.element.nativeElement.id === widget.id;
    });
  }

  createWidgetContainer(widget: Widget): void {
    if (!widget.factory && widget.ref) {
      const factory = this.cfResolver
        .resolveComponentFactory(WidgetsContainerComponent);

      widget.factory = widget.ref.createComponent(factory);

      if (widget.widgets.length > 0) {
        widget.factory.instance.widget = widget;
      }

      widget.factory.changeDetectorRef.detectChanges();

      this.renderer.appendChild(
        widget.ref.element.nativeElement,
        widget.factory.injector.get(WidgetsContainerComponent).elRef.nativeElement
      );
    }
  }

  openWidgetEditorDialog(widget: Widget, type: string, index: number): void {
    console.log('openWidgetPlayerDialog()', widget);

    widget.type = type;

    const widgetEditorDialogConfig = { data: widget };

    this.dialog
      .open(WidgetsDialogComponent, widgetEditorDialogConfig)
      .afterClosed()
        .subscribe((result) => {
          console.log('Close dialog', { result });
        });

  }
}

