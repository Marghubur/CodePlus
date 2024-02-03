import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DailyParagraph, DictionaryResponse } from 'src/util/intrface';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-daily-article',
  templateUrl: './daily-article.component.html',
  styleUrls: ['./daily-article.component.scss']
})
export class DailyArticleComponent implements OnInit {

  dictionay:Array<DictionaryResponse> = [];
  isDictionaryLoaded: boolean = true;
  active = 1;
  isRandomWordLoading: boolean = false;
  randomWord: any = null;
  isArticleLoaded: boolean = false;
  dailyParagrah: DailyParagraph = {
    Content: "",
    Link: "",
    Title: "",
    Note: ""
  };

  constructor(private httpclient: HttpClient,
              private http: AjaxService) {}

  ngOnInit(): void {
    this.getDailyArticle()
  }

  getDailyArticle() {
    this.isArticleLoaded = false;
    this.http.get("DailyRandonArticle/GetDailyRandomArticle").subscribe((res: any) => {
      if (res.ResponseBody) {
        this.dailyParagrah = res.ResponseBody;
        this.isArticleLoaded = true;
      }
    })
  }

  getWordMeaning(e: any) {
    this.isDictionaryLoaded = false;
    let value = e.target.value;
    if (value) {
      this.httpclient.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`).subscribe((res: any) => {
        this.dictionay = res;
        this.isDictionaryLoaded = true;
      })
    }
  }

  getRandomWord() {
    this.isRandomWordLoading = true;
    this.httpclient.get(`https://random-words-api.vercel.app/word/`).subscribe((res: any) => {
      this.randomWord = res;
      this.isRandomWordLoading = false;
    })
  }
}
