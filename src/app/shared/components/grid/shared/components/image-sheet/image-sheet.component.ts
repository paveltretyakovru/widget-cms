import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Widget } from '../../interfaces/widget';
import { CmsImage } from 'src/app/shared/interfaces/cms-image';

export interface ImageSheetDataInterface {
  widget: Widget;
  images: CmsImage[];
}

export interface ImageSheetComponentInterface {
  // Members
  file: File;
  data: ImageSheetDataInterface;
  image: CmsImage;
  sheetRef: MatBottomSheetRef<ImageSheetComponent>;

  // Template methods
  checkToDisabledApply(): boolean;

  // Events
  onChange($event: EventTarget): void;
  onImageWasRemoved($event): void;
  onClickButtonApply(): void;
  onClickButtonRemove(): void;
}

@Component({
  selector: 'app-image-sheet',
  templateUrl: './image-sheet.component.html',
  styleUrls: ['./image-sheet.component.scss']
})
export class ImageSheetComponent
       implements ImageSheetComponentInterface, OnInit {
  // ---------------------------------------------------------------------------
  // =============================== Members ===================================
  // ---------------------------------------------------------------------------
  file: File;
  image: CmsImage = { title: '', url: '' };

  // ---------------------------------------------------------------------------
  // =============================== Live loop =================================
  // ---------------------------------------------------------------------------
  constructor(
    private api: ApiService,
    public sheetRef: MatBottomSheetRef<ImageSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ImageSheetDataInterface
  ) { }

  ngOnInit() {
    if (this.data && this.data.widget.content.image) {
      console.log('ImageSheetComponent#ngOnInit()', this.data.widget.content);

      const imageId = this.data.widget.content.image;
      this.image = this.data.images.find((image) => image._id === imageId);
    }
  }

  // ---------------------------------------------------------------------------
  // ========================== Template methods ===============================
  // ---------------------------------------------------------------------------
  checkToDisabledApply(): boolean {
    console.log('checkToDisabledApply', !this.file, !this.image.url);
    return !this.file && !this.image.url;
  }

  // ---------------------------------------------------------------------------
  // =============================== Events ====================================
  // ---------------------------------------------------------------------------
  onChange($event: EventTarget): void {
    const eventObject: MSInputMethodContext = <MSInputMethodContext> $event;
    const target: HTMLInputElement = <HTMLInputElement> eventObject.target;
    const files: FileList = target.files;
    this.file = files[0];
  }

  onClickButtonApply(): void {
    // Prepare image form data
    const formData: FormData = new FormData();
    formData.append('url', this.image.url || '');
    formData.append('file', this.file);
    formData.append('title', this.image.title || '');

    const responseHandler = (imageContent: CmsImage) => {
      const image = this.data.images.find((i) => i._id === imageContent._id);

      if (image) {
        Object.assign(image, imageContent);
      } else {
        this.data.images.push(imageContent);
      }

      this.sheetRef.dismiss(imageContent);
    };

    // Update image document
    if (this.image._id) {
      this.api.update$('images', this.image._id, formData)
        .subscribe(responseHandler);

    // Create new image document
    } else {
      this.api.create$('images', formData)
        .subscribe(responseHandler);
    }
  }

  onClickButtonRemove(): void {
    this.file = null;
  }

  onImageWasRemoved($event): void {
    this.data.widget.content.image = null;
    this.sheetRef.dismiss();
  }
}
