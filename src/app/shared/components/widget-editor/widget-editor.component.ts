// Core
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef,
         QueryList, Input, AfterViewInit, ComponentFactoryResolver, OnDestroy
} from '@angular/core';

// Components
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';

// Interfaces
import { Widget } from './widget';
import { IRectangle } from 'ngx-widget-grid';
import { WidgetEditor, WidgetEditorConfiguration } from './widget-editor';
import { WidgetEditorDialogConfig } from './shared/components/widget-editor-dialog/widget-editor-dialog';
import { WidgetEditorDialogComponent } from './shared/components/widget-editor-dialog/widget-editor-dialog.component';
import { makeId } from '../../helpers/make-id';
import { WidgetEditorContainerComponent } from './shared/components/widget-editor-container/widget-editor-container.component';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss']
})
export class WidgetEditorComponent
       implements WidgetEditor, OnInit, AfterViewInit, OnDestroy {

  // References
  @ViewChild('grid')
    grid: NgxWidgetGridComponent;

  @ViewChildren('widgetsRef', { read: ViewContainerRef })
    widgetsRef: QueryList<ViewContainerRef>;

  @ViewChildren('widgetsContainerRef', { read: ViewContainerRef })
    widgetsContainerRef: QueryList<ViewContainerRef>;

  // Inputs
  @Input() configuration: WidgetEditorConfiguration;

  // Data
  @Input() widgets: Widget[] = [];

  // Configuration
  rows = 6;
  cols = 6;
  width = '100%';
  height = '500px';
  movable = true;
  editable = true;
  showGrid = true;
  showPanel = true;
  resizable = true;

  constructor(
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.prepareConfiguration();
  }

  ngAfterViewInit() {
    this.setListenerToWidgetsRefChanges();
  }

  ngOnDestroy() {
    for (let i = 0; i < this.widgets.length; i++) {
      const widget = this.widgets[i];

      if (widget.factory) {
        widget.factory.changeDetectorRef.detach();
      }
    }
  }

  addWidget(): Widget {
    const nextPosition: IRectangle = this.grid.getNextPosition();

    this.widgets.push({
      id: `widget-${makeId()}`,
      ref: null,
      size: null,
      type: null,
      content: null,
      factory: null,
      position: nextPosition,
      container: null,
    });

    return [ ...this.widgets ].pop();
  }

  onWidgetPositionChange($event: WidgetPositionChange): void {
    this.widgets[$event.index].position = $event.newPosition;
    this.updateWidgetsSizeData();

    console.log('onWidgetPositionChange()', this.widgets);
  }

  openWidgetEditorDialog(widget: Widget, type: string, index: number): void {
    console.log('openWidgetPlayerDialog()', widget);

    const widgetEditorDialogConfig: WidgetEditorDialogConfig = {
      minWidth: '90%',
      data: widget
    };

    this.dialog
      .open(WidgetEditorDialogComponent, widgetEditorDialogConfig)
      .afterClosed()
        .subscribe((resultWidget: Widget) => {
          console.log('Widget editor dialog closed', resultWidget);
        });

  }

  prepareConfiguration(): void {
    if (this.configuration) {
      Object.keys(this.configuration)
        .forEach((config) => {
          if (this[config]) {
            this[config] = this.configuration[config];
          }
        });
    }
  }

  setListenerToWidgetsRefChanges(): void {
    this.widgetsContainerRef.notifyOnChanges = () => {
      this.widgets.forEach((widget) => {
        const widgetRef = this.findWidgetRefById(widget.id);

        if (widgetRef) {
          const container = this.findWidgetContainerRefById(widget.id);

          // Update widget information about referals link
          widget.ref = widgetRef;

          widget.container = container;

          // Update widget size information
          this.updateWidgetsSizeData();

          // Inserting container component to widget
          this.insertContainerToWidget(widget);
        }
      });

      console.log('Widgets ref was changed!', this.widgets);
    };
  }

  updateWidgetsSizeData() {
    for (let i = 0; i < this.widgets.length; i++) {
      const widget = this.widgets[i];

      if (widget.ref) {
        const widgetRef = this.findWidgetRefById(widget.id);

        // Take widget dom element sizes
        const {
          offsetWidth: width,
          offsetHeight: height,
        } = widgetRef.element.nativeElement;

        widget.size = { width, height };
      }
    }
  }

  findWidgetRefById(id: string): ViewContainerRef {
    return this.widgetsRef.find((ref) => {
      return ref.element.nativeElement.id === id;
    });
  }

  findWidgetContainerRefById(id: string): ViewContainerRef {
    return this.widgetsContainerRef.find((container) => {
      return container.element.nativeElement.id === `container-${id}`;
    });
  }

  insertContainerToWidget(widget: Widget): void {
    if (!widget.factory) {
      const factory = this.componentFactoryResolver
        .resolveComponentFactory(WidgetEditorContainerComponent);

      this.ngOnDestroy();

      // Insert widget component to the widget
      widget.factory = widget.container.createComponent(factory);
      widget.factory.instance.configuration = { widget };
      widget.factory.changeDetectorRef.detectChanges();
    }
  }
}
