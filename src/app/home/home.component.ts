import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { TopicContent } from 'src/util/intrface';
import * as jsonData from '../../assets/content-detail.json'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  item: Array<TopicContent> = [];
  data: any = jsonData;
  
  constructor(private router:Router,
              private common: CommonService) {}

  ngOnInit(): void {
    this.common.loader(true);
    this.item = (this.data as any).default;
    this.common.loader(false);
  }

  viewContent(item:TopicContent) {
    this.router.navigate(['/blog/view'], {queryParams: {type: item.Type, part: item.Part}});
  }
}