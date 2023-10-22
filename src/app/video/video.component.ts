import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  safeURL: any = null;
  
  videoUrl = 'https://www.youtube.com/embed/Onxa1ges-S8'
  constructor(private _sanitizer: DomSanitizer) {
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
}
