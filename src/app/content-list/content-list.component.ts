import { Component, HostListener, OnInit } from '@angular/core';
import { TopicContent } from 'src/util/intrface';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  contentDetail: Array<TopicContent> = [];
  isLoading: boolean = false;
  page: number = 1; // Initial page
  allDataLoaded: boolean = false;

  constructor(private router: Router,
              private http: AjaxService,
              private common: CommonService){}
  
  editContent(item: TopicContent) {
    this.router.navigate(['/blog/editor'], {queryParams: {Type: item.Type, contentId: item.ContentId, Part: item.Part}});
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.common.loader(true);
    this.isLoading = true;
    this.http.get(`Article/GetAllContentList/${this.page}`).subscribe((res: any) => {
      if (res.ResponseBody) {
        if (res.ResponseBody.length === 0) {
          this.allDataLoaded = true; // No more data available
        }
        this.contentDetail = this.contentDetail.concat(res.ResponseBody);
        if (this.contentDetail && this.contentDetail.length > 0) {
          this.contentDetail.forEach(x => {
            x.ImgPath = this.http.imgBaseUrl + x.ImgPath;
          })
        }
        this.page++;
        this.common.loader(false);
        this.isLoading = false;
      }
    }, (err) => {
      this.isLoading = false;
      this.common.loader(false);
      this.common.error(err);
    })
  }

  publishArticle(item: TopicContent, e: any) {
    if (item) {
      this.common.loader(true);
      item.IsPublish = e.target.checked;
      this.http.post("Article/PublishArticle", item).subscribe((res: any) => {
        if (res.ResponseBody) {
          if (item.IsPublish)
            this.common.success("Published successfully");
          else
            this.common.success("Un-published successfully");

          this.common.loader(false);
        }
      }, (err) => {
        this.common.loader(false);
        this.common.error(err);
      })
    }
  }
}
