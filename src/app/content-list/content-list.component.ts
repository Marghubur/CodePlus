import { Component, OnInit } from '@angular/core';
import { TopicContent } from 'src/util/intrface';
import * as jsonData from '../../assets/content-detail.json'; 
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
  data: any = jsonData;

  constructor(private router: Router,
              private http: AjaxService,
              private common: CommonService){}
  
  ngOnInit(): void {
    this.contentDetail = (this.data as any).default;
    //this.loadData();
  }

  editContent(item: TopicContent) {
    this.router.navigate(['/blog/editor'], {queryParams: {FileName: item.FileName, Type: item.Type, Folder: item.Folder, Id: item.ContentId, Part: item.Part}});
  }

  loadData() {
    this.common.loader(true);
    this.http.get("Article/GetContentList").subscribe((res: any) => {
      if (res.ResponseBody) {
        this.common.loader(false);
        this.contentDetail = res.ResponseBody;
        console.log(this.contentDetail )
      }
    }, (err) => {
      this.common.loader(false);
      console.log(err.error.StatusMessage);
    })
  }
}
