import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef,
  QueryList, Input, OnDestroy, ComponentFactoryResolver, AfterViewInit
} from '@angular/core';

import { NgxWidgetGridComponent, WidgetPositionChange, IRectangle } from 'ngx-widget-grid';

// Ingerfaces
import { WidgetPlayer } from './shared/interfaces/widget-player';
import { Widget } from './shared/interfaces/widget';
import { makeId } from '../../helpers/make-id';
import { MatDialog } from '@angular/material';
import { WidgetPlayerDialogComponent } from './shared/components/widget-player-dialog/widget-player-dialog.component';
import { WidgetPlayerDialogSettings } from './shared/components/widget-player-dialog/shared/interfaces/widget-player-dialog-settings';
import { WidgetPlayerContainerComponent } from './shared/components/widget-player-container/widget-player-container.component';
import { GetDocumentFieldComponent } from './shared/components/get-document-field/get-document-field.component';

@Component({
  selector: 'app-widget-player',
  templateUrl: './widget-player.component.html',
  styleUrls: ['./widget-player.component.scss']
})
export class WidgetPlayerComponent
  implements WidgetPlayer, OnInit, OnDestroy, AfterViewInit {
  @Input() widgets: Widget[] = [];

  @Input() cols = 12;
  @Input() rows = 12;
  @Input() movable = true;
  @Input() editable = true;
  @Input() showGrid = true;
  @Input() resizable = true;
  @Input() minHeight = 500;
  @Input() gridWidth = null;
  @Input() gridHeight = null;
  @Input() controlPanel = true;
  @Input() highlightNextPosition = false;

  @ViewChild('grid')
    grid: NgxWidgetGridComponent;

  @ViewChildren('gridWidgetsPlace', { read: ViewContainerRef })
    gridWidgetsPlace: QueryList<ViewContainerRef>;

  @ViewChildren('gridWidgetContainers', { read: ViewContainerRef })
    gridWidgetContainers: QueryList<ViewContainerRef>;

  constructor(
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
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

  addWidget(): void {
    const nextPosition: IRectangle = this.grid.getNextPosition();

    if (nextPosition) {
      this.widgets.push({
        id: `widget-${makeId()}`,
        view: null,
        factory: null,
        rectangle: { ...nextPosition },
        component: WidgetPlayerContainerComponent,
      });
    } else {
      console.warn('No Space Available!! ');
    }
  }

  initWidgetsListChangeWatcher() {
    // When widget grid have updated
    this.gridWidgetsPlace.notifyOnChanges = () => {
      for (let i = 0; i < this.widgets.length; i++) {
        const widget = this.widgets[i];

        // If vidget don't have touched widget view
        if (!widget.view) {
          // Search widget view with widget id
          const view = this.gridWidgetsPlace.find((item) => {
            return widget.id === item.element.nativeElement.id;
          });

          if (view) {
            widget.view = view;

            const factory = this.componentFactoryResolver
              .resolveComponentFactory(widget.component);

            this.ngOnDestroy();

            // Insert widget component to the widget
            widget.factory = view.createComponent(factory);
            widget.factory.changeDetectorRef.detectChanges();

            // (<WidgetContainerComponent>widget.factory.instance).options = { value: 'test' };
          }
        }
      }
    };
  }

  openWidgetDialog(widget: Widget, type: string, index: number) {
    const { offsetHeight, offsetWidth} = this.gridWidgetContainers
      .toArray()[index].element.nativeElement;

    const settings: WidgetPlayerDialogSettings = {
      type,
      widget,
      gridWidth: offsetWidth,
      gridHeight: offsetHeight,
    };

    const widgetSettingsRef = this.dialog.open(WidgetPlayerDialogComponent, {
      width: '90%',
      height: '90%',
      data: settings,
    });

    widgetSettingsRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  toggleHighlight(doHighlight: boolean): void {
    this.highlightNextPosition = !!doHighlight;
  }

  onWidgetChange(event: WidgetPositionChange): void {
    console.log('WidgetPlayerComponent#onWidgetChange', event);
    this.widgets[event.index].rectangle = { ...event.newPosition };
    console.log('WidgetPlayerComponent#onWidgetChange', this.widgets);
  }

  onGridFull(event: any): void { }
  deleteWidget(index: number): void { this.widgets.splice(index, 1); }

}
