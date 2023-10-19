import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { TopicContent } from 'src/util/intrface';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  item: Array<TopicContent> = [];
  
  constructor(private router:Router,
              private common: CommonService,
              private http: AjaxService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.common.loader(true);
    this.http.get("Article/GetContentList").subscribe((res: any) => {
      if (res.ResponseBody) {
        this.common.loader(false);
        this.item = res.ResponseBody;
        if (this.item && this.item.length > 0) {
          this.item.forEach(x => {
            x.ImgPath = this.http.imgBaseUrl + x.ImgPath;
          })
        }
        console.log(this.item )
      }
    }, (err) => {
      this.common.loader(false);
      console.log(err.error.StatusMessage);
    })
  }

  viewContent(item:TopicContent) {
    this.router.navigate(['/blog/view'], {queryParams: {type: item.Type, part: item.Part, contentId: item.ContentId}});
  }
}