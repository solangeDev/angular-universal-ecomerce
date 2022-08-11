import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.html',
  styleUrls: ['./upload-image.scss'],
})
export class UploadImageComponent implements OnInit {
  @Output() imageEvent = new EventEmitter<any>();
  @Input() extensions?: string;
  @Input() value?: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  file?: string | ArrayBuffer | null;
  ImgExtDefault = 'gif|jpe?g|tiff?|png|webp|bmp';

  constructor() {}

  uploadImage(): void {
    this.fileInput.nativeElement.click();
  }

  ngOnInit(): void {
    if (this.extensions === undefined) {
      this.extensions = this.ImgExtDefault;
    }
    if (this.value) {
      this.file = this.value;
    }
  }

  updateImage() {
    this.file = null;
  }

  fileChangeHandler(e: Event) {
    const reader = new FileReader();
    const file = (<HTMLInputElement>e.target).files?.[0];
    if (file && this.extensions !== undefined && new RegExp(this.extensions, 'i').test(file.name) === true) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file = reader.result;
        this.imageEvent.emit(file);
      };
    }
  }
}
