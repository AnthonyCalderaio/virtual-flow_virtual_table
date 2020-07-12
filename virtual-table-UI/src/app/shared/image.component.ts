import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  loaded = false;
  notFound = false;
  source: string;

  @Input() set src(src: string) {
    const image = new Image();
    this.source = src;
    image.src = src;
    image.onerror = () => this.notFound = true;
    image.onload = () => this.loaded = true;
  }

  @Input() width: number;
  @Input() height: number;
}
