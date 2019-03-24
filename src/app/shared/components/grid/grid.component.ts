import {
  Component, OnInit, ViewChild, Input, ViewChildren, ViewContainerRef,
  QueryList, AfterViewInit, Output, EventEmitter
} from '@angular/core';

import { Widget, createEmptyWidgetObject, WidgetBackbone } from './interfaces/widget';
import { WidgetPositionChange, NgxWidgetGridComponent } from 'ngx-widget-grid';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { FieldSheetComponent } from './field-sheet/field-sheet.component';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit {
  @Output() widgetsUpdated = new EventEmitter<any>();

  @ViewChild('grid') grid: NgxWidgetGridComponent;
  @ViewChildren('widgetsRefs', { read: ViewContainerRef })
    widgetsRefs: QueryList<ViewContainerRef>;

  @Input() widgets: Widget[] = [];

  @Input() gridWidth;
  @Input() gridHeight = 500;

  @Input() cols = 12;
  @Input() rows = 12;
  @Input() movable = true;
  @Input() editable = true;
  @Input() showGrid = true;
  @Input() showPanel = true;
  @Input() resizable = true;
  @Input() swapWidgets = true;
  @Input() highlightNextPosition = false;

  constructor(
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.widgetsRefs.notifyOnChanges = () => {
      this.widgetsRefs.forEach((ref) => {
        // Take widget dom element sizes
        this.updateWidgetSizeInformation({ ref });
        this.prepareWidgetsInformation();
      });
    };
  }

  // =========================================================
  //                        Grid events
  // =========================================================

  onWidgetPositionChange($event: WidgetPositionChange): void {
    this.widgets[$event.index].position = { ...$event.newPosition };

    this.updateWidgetSizeInformation({ widget:  this.widgets[$event.index]});
    this.prepareWidgetsInformation();
  }

  onClickAddWidget(): void {
    this.createWidget();
  }

  onClickDeleteWidget(index) {
    this.widgets.splice(index, 1);
  }

  onCloseGroupDialog(widget: Widget, widgets: WidgetBackbone[]) {
    const { height: rows, width: cols } = widget.position;
    widget.content = { group: widgets, grid: { cols, rows } };

    this.prepareWidgetsInformation();
  }

  onSelectDocumentField(widget: Widget, field: CmsDocumentField) {
    widget.content = { field };
    this.prepareWidgetsInformation();
  }

  toggleHighlight(doHighlight: boolean): void {
    this.highlightNextPosition = !!doHighlight;
  }

  onGridFull(event: any): void { }

  // =========================================================
  //                   Search methods
  //  ========================================================

  getRefById(id: string): ViewContainerRef {
    return this.widgetsRefs.find((ref) => {
      return ref.element.nativeElement.id === id;
    });
  }

  getWidgetById(id: string): Widget {
    return this.widgets.find((widget) => {
      return widget.id === id;
    });
  }

  getWidgetByRef(ref: ViewContainerRef): Widget {
    return this.getWidgetById(ref.element.nativeElement.id);
  }

  // =========================================================
  //                      Methods
  // =========================================================
  prepareWidgetsInformation(): WidgetBackbone[] {
    const widgets: WidgetBackbone[] = this.widgets.map((widget) => {
      return {
        size: { ...widget.size },
        content: { ...widget.content },
        position: { ...widget.position },
      };
    });

    this.widgetsUpdated.emit(widgets);
    return widgets;
  }

  createWidget(content?): Widget {
    const nextPosition = this.grid.getNextPosition();

    if (content) {
      this.widgets.push({
        ...createEmptyWidgetObject(),
        position: { ...nextPosition },
        content: { ...content },
      });
    } else {
      this.widgets.push({
        ...createEmptyWidgetObject(),
        position: { ...nextPosition },
      });
    }

    return [ ...this.widgets ].pop();
  }

  openFieldDialog(widget: Widget): void {
    this.bottomSheet
      .open(FieldSheetComponent)
      .afterDismissed()
        .subscribe((fieldDialogResult: CmsDocumentField) => {
          this.onSelectDocumentField(widget, fieldDialogResult);
        });
  }

  openGroupDialog(widget: Widget): void {
    this.dialog
      .open(
        GroupDialogComponent,
        { data: { position: widget.position, size: widget.size } }
      )
      .afterClosed()
        .subscribe((groupDialogResult: WidgetBackbone[]) => {
          this.onCloseGroupDialog(widget, groupDialogResult);
        });
  }

  updateWidgetSizeInformation(
    config: {
      id?: string,
      ref?: ViewContainerRef,
      size?: { width: number, height: number },
      widget?: Widget,
    }
  ): void {
    const getRefSize = (ref: ViewContainerRef) => {
      const el = ref.element.nativeElement;
      const { offsetWidth: width, offsetHeight: height} = el;
      return { width, height };
    };

    if (config.widget) {
      const ref = this.getRefById(config.widget.id);

      if (ref) {
        config.widget.size = getRefSize(ref);
      }
    }

    if (config.ref) {
      const widget = this.getWidgetByRef(config.ref);

      if (widget) {
        widget.size = getRefSize(config.ref);
      }
    }

    if (config.id && config.size) {
      const widget = this.getWidgetById(config.id);
      widget.size = config.size;
    }
  }
}
