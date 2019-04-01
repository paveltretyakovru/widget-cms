import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-image-sheet',
  templateUrl: './image-sheet.component.html',
  styleUrls: ['./image-sheet.component.scss']
})
export class ImageSheetComponent implements OnInit {
  file: File;

  constructor(
    private api: ApiService,
    public sheetRef: MatBottomSheetRef<ImageSheetComponent>
  ) { }

  ngOnInit() {
  }

  onChange($event: EventTarget) {
    const eventObject: MSInputMethodContext = <MSInputMethodContext> $event;
    const target: HTMLInputElement = <HTMLInputElement> eventObject.target;
    const files: FileList = target.files;
    this.file = files[0];
  }

  onClickUpload() {
    const formData: FormData = new FormData();
    formData.append('file', this.file);

    this.api.create$('images', formData)
      .subscribe((filePath: string) => this.sheetRef.dismiss(filePath));
  }
}
