import {Component, Input, OnInit} from '@angular/core';
import {NewsPost} from "../../models/news-post";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() dataSource!: NewsPost;

  constructor() { }

  ngOnInit(): void {
  }

}
