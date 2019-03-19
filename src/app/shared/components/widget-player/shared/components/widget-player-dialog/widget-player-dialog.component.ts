import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Interfaces
import { Widget } from '../../interfaces/widget';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';
import { WidgetPlayerDialog } from './shared/interfaces/widget-player-dialog';

@Component({
  selector: 'app-widget-player-dialog',
  templateUrl: './widget-player-dialog.component.html',
  styleUrls: ['./widget-player-dialog.component.scss']
})
export class WidgetPlayerDialogComponent implements WidgetPlayerDialog, OnInit {
  constructor(
    public dialogRef: MatDialogRef<WidgetPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public widget: Widget
  ) { }

  ngOnInit(): void {
    console.log('WidgetPlayerDialogComponent', this.widget);
  }

  fieldSelected(field: CmsDocumentField): void {
    console.log('Field selected', field);
    this.widget.context.field = field;
  }

  makeDeal(): void {
    this.dialogRef.close(this.widget);
  }
}
