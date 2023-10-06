import { Component, OnInit } from '@angular/core';
import { TopicContent } from 'src/util/intrface';
import * as jsonData from '../../assets/content-detail.json'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  contentDetail: Array<TopicContent> = [];
  data: any = jsonData;

  constructor(private router: Router){}
  
  ngOnInit(): void {
    this.contentDetail = (this.data as any).default;
  }

  editContent(item: TopicContent) {
    this.router.navigate(['/blog/editor'], {queryParams: {FileName: item.FileName, Type: item.Type, Folder: item.Folder, Id: item.Id, Part: item.Part}});
  }
}
