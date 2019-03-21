import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { NgxWidgetGridComponent, WidgetPositionChange, IRectangle } from 'ngx-widget-grid';
import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef, QueryList, Input, AfterViewInit } from '@angular/core';

// Helpers
import { makeId } from '../../helpers/make-id';

// Ingerfaces
import { Widget } from './shared/interfaces/widget';
import { WidgetPlayer } from './shared/interfaces/widget-player';

// Components
import { WidgetPlayerDialogComponent } from './shared/components/widget-player-dialog/widget-player-dialog.component';

@Component({
  selector: 'app-widget-player',
  templateUrl: './widget-player.component.html',
  styleUrls: ['./widget-player.component.scss']
})
export class WidgetPlayerComponent implements WidgetPlayer, OnInit, AfterViewInit {
  @Input() cols = 4;
  @Input() rows = 4;
  @Input() movable = true;
  @Input() editable = true;
  @Input() showGrid = true;
  @Input() resizable = true;
  @Input() minHeight = 100;
  @Input() gridWidth = null;
  @Input() gridHeight = null;
  @Input() controlPanel = true;
  @Input() highlightNextPosition = false;

  // TODO: NEED-INTERFACE
  private _widgets = new BehaviorSubject<Widget[]>([]);
  @Input()
  set widgets(widgets: Widget[]) { this._widgets.next(widgets); }
  get widgets(): Widget[] { return this._widgets.getValue(); }

  @ViewChild('grid')
    grid: NgxWidgetGridComponent;

  @ViewChildren('widgetsList', { read: ViewContainerRef })
    widgetsList: QueryList<ViewContainerRef>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.widgetsList.notifyOnChanges = () => {
    console.log('WidgetPlayerComponent#notifyOnChanges()', {
      widgetsList: this.widgetsList,
      widgets: this.widgets,
    });

      this.widgetsList.toArray().forEach((widget, index) => {
        const { offsetHeight, offsetWidth } = widget.element.nativeElement;

        this.widgets[index].container = {
          width: offsetWidth,
          height: offsetHeight,
          element: widget,
        };
      });
    };
  }

  addWidget(widget?: Widget): void {
    const nextPosition: IRectangle = this.grid.getNextPosition();

    if (nextPosition) {
      this.widgets.push({
        id: `widget-${makeId()}`,
        type: '',
        context: {
          widgets: [],
        },
        container: null,
        rectangle: { ...nextPosition },
      });
    } else {
      console.warn('No Space Available!! ');
    }
  }

  openWidgetDialog(widget: Widget, type: string, index: number) {
    widget.type = type;

    const widgetSettingsRef = this.dialog.open(
      WidgetPlayerDialogComponent,
      { width: '90%', height: '90%', data: widget }
    );

    widgetSettingsRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', {result, grid: this.grid});
    });
  }

  toggleHighlight(doHighlight: boolean): void {
    this.highlightNextPosition = !!doHighlight;
  }

  onWidgetChange(event: WidgetPositionChange): void {
    const { index, newPosition } = event;
    const { container } = this.widgets[index];

    this.widgets[index].rectangle = { ...newPosition };

    console.log('WidgetPlayerComponent#onWidgetChange()', { index, widgets: this.widgets });

    // If widget was rendered
    if (container) {
      const {
        offsetWidth,
        offsetHeight
      } = container.element.element.nativeElement;

      // Updating widget container size information
      container.width = offsetWidth;
      container.height = offsetHeight;
    }
  }

  onGridFull(event: any): void { }
  deleteWidget(index: number): void { this.widgets.splice(index, 1); }

}
