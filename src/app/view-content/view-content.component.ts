import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, ContentList } from '../services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit {
  item: any = null;
  now: Date = new Date();
  isFileFound: boolean = false;
  content: any = null;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private http: AjaxService,
              private common: CommonService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.item = params.params); // output: 
    this.loadData();
  }

  loadData() {
    if (this.item.contentId > 0) {
      this.common.loader(true);
      this.http.get(`Article/GetContentById/${this.item.contentId}`).subscribe((res: any) => {
        if (res.ResponseBody) {
          this.content = this.sanitizer.bypassSecurityTrustHtml(res.ResponseBody.BodyContent);
          this.isFileFound = true;
          this.common.loader(false);
          console.log(res.ResponseBody)
        }
      }, (err) => {
        this.common.loader(false);
        console.log(err.error.StatusMessage);
      })
    }
  }
}
