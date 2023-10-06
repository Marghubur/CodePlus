import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, ContentList } from '../services/common.service';
import * as jsonData from '../../assets/content-detail.json';
import { DomSanitizer } from '@angular/platform-browser';

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
  data: any = jsonData;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private common: CommonService) {}

  ngOnInit(): void {
    this.common.loader(true);
    this.route.queryParamMap.subscribe((params: any) => this.item = params.params); // output: 
    this.loadData();
  }
  
  loadData() {
    this.isFileFound = false;
    let value = (this.data as any).default;
    let selecteddata:ContentList = value.find(x => x.Type.toLocaleLowerCase() === this.item.type.toLocaleLowerCase() && x.Part == this.item.part);
    if (selecteddata) {
      this.common.readTxtFile(selecteddata.Folder ,selecteddata.FileName).subscribe((res: any) => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(res);
        this.isFileFound = true;
        this.common.loader(false);
      }, (error) => {
        this.common.loader(false);
        console.log(error)
      });
    }
  }

}
