import { Component, HostListener } from '@angular/core';
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
  isLoading: boolean = false;
  page: number = 1; // Initial page
  allDataLoaded: boolean = false;

  constructor(private router:Router,
              private common: CommonService,
              private http: AjaxService) {}

  ngOnInit(): void {
    this.loadData();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e: any) {
    e.stopPropagation()
    if (!this.isLoading && !this.allDataLoaded &&
       window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
        this.loadData();
    }
  }

  loadData() {
    this.common.loader(true);
    this.isLoading = true;
    this.http.get(`Article/GetArticleList/${this.page}`).subscribe((res: any) => {
      if (res.ResponseBody) {
        if (res.ResponseBody.length === 0) {
          this.allDataLoaded = true; // No more data available
        }
        this.item = this.item.concat(res.ResponseBody);
        if (this.item && this.item.length > 0) {
          this.item.forEach(x => {
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

  viewContent(item:TopicContent) {
    this.router.navigate(['/blog/view'], {queryParams: {type: item.Type, part: item.Part, contentId: item.ContentId}});
  }

}

