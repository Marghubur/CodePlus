import { Component } from '@angular/core';
import { TopicContent } from 'src/util/intrface';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  item: Array<TopicContent> = [];
  
  constructor(private router:Router,
              private common: CommonService,
              private http: AjaxService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.common.loader(true);
    this.http.get("Article/GetArticleList").subscribe((res: any) => {
      if (res.ResponseBody) {
        this.common.loader(false);
        this.item = res.ResponseBody;
        if (this.item && this.item.length > 0) {
          this.item.forEach(x => {
            x.ImgPath = this.http.imgBaseUrl + x.ImgPath;
          })
        }
      }
    }, (err) => {
      this.common.loader(false);
      this.common.error(err.error.StatusMessage);
    })
  }

  viewContent(item:TopicContent) {
    this.router.navigate(['/blog/view'], {queryParams: {type: item.Type, part: item.Part, contentId: item.ContentId}});
  }
}
