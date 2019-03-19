import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';
import { Widget } from '../../../../interfaces/widget';

export interface WidgetPlayerDialog {
  widget: Widget;

  makeDeal(): void;
  fieldSelected(field: CmsDocumentField): void;
}
