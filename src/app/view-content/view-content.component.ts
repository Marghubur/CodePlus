import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, ContentList } from '../services/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AjaxService } from '../services/ajax.service';
import { TopicContent } from 'src/util/intrface';

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
  contentDetail: TopicContent = {
    BodyContent : "",
    Part: 0,
    FilePath: "",
    ImgPath: "",
    Type:"",
    Title: "",
    Detail: "",
    IsArticle: false
  }
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
          this.contentDetail = res.ResponseBody;
          this.content = this.sanitizer.bypassSecurityTrustHtml(res.ResponseBody.BodyContent);
          this.isFileFound = true;
          this.common.loader(false);
          this.common.error(res.ResponseBody)
        }
      }, (err) => {
        this.common.loader(false);
        this.common.error(err);
      })
    }
  }
}
