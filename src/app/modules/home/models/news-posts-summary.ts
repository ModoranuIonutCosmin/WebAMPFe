import {NewsPost} from "./news-post";

export interface NewsPostsSummary {
  news: Array<NewsPost>;
  total: number;
}
