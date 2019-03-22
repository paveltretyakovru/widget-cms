import { IRectangle } from 'ngx-widget-grid';
import { ViewContainerRef, ComponentRef } from '@angular/core';
import { WidgetEditorContainerComponent } from './shared/components/widget-editor-container/widget-editor-container.component';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';

export interface Widget {
  id: string;
  ref: ViewContainerRef;
  type: string;
  factory: ComponentRef<WidgetEditorContainerComponent>;
  position: IRectangle;
  container: ViewContainerRef;

  content: {
    field?: CmsDocumentField;
    widgets?: Widget[];
  };

  size: {
    width: number;
    height: number;
  };
}
