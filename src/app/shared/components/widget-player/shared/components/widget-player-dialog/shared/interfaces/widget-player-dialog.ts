import { WidgetPlayerDialogSettings } from './widget-player-dialog-settings';
import { CmsDocumentField } from 'src/app/admin/documents/document/shared/interfaces/cms-document-field';

export interface WidgetPlayerDialog {
  settings: WidgetPlayerDialogSettings;

  fieldSelected(field: CmsDocumentField): void;
  prepareSettings(): void;
}
