import { Component, OnInit, Inject } from '@angular/core';
import { WidgetPlayerDialogSettings } from './shared/interfaces/widget-player-dialog-settings';
import { WidgetPlayerDialog } from './shared/interfaces/widget-player-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';

@Component({
  selector: 'app-widget-player-dialog',
  templateUrl: './widget-player-dialog.component.html',
  styleUrls: ['./widget-player-dialog.component.scss']
})
export class WidgetPlayerDialogComponent implements WidgetPlayerDialog, OnInit {
  settings: WidgetPlayerDialogSettings;

  constructor(
    public dialogRef: MatDialogRef<WidgetPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: WidgetPlayerDialogSettings
  ) { }

  ngOnInit(): void {
    this.prepareSettings();
  }

  prepareSettings(): void {
    console.log('WidgetPlayerSettingsComponent#preapreSettings', this.dialogData);

    if (this.dialogData) {
      this.settings = this.dialogData;
    }
  }

  fieldSelected(field: CmsDocumentField): void {
    console.log('Field selected', field);
  }

}
