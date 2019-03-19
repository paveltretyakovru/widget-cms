import { IRectangle } from 'ngx-widget-grid';
import { ViewContainerRef } from '@angular/core';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';

export interface Widget {
  id: string;
  type: string;
  rectangle: IRectangle;

  container: {
    width: number;
    height: number;
    element: ViewContainerRef;
  };

  context? : {
    field?: CmsDocumentField;
    widgets?: Widget[];
    collection?: any[];
  };
}
