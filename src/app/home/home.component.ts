import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  item: Array<ItemDetail> = [];
  
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.item = [{
      Title: "C# Generics Interview Questions",
      Detail: "This is the 1st part of this C# Interview Questions and Answers article series. Each part will contain 10 C# Interview Questions with Answers. I will highly recommend to please read the previous parts always before reading the current part." ,
      Img: "assets/c1.jpg",
      Type: "C#",
      Part: 1
    }]
  }

  viewContent(item:ItemDetail) {
    this.router.navigate(['/blog/view'], {queryParams: {type: item.Type, part: item.Part}});
  }
}

interface ItemDetail {
  Title: string,
  Img: string,
  Detail: string,
  Link?: string,
  Type: string,
  Part: number
}
