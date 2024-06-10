import { NewsItemsType } from '../../types/news';

export interface newsApi {
  getNews(query: string): Promise<{
    lastBuildDate: Date;
    total: number;
    start: number;
    display: number;
    items: NewsItemsType[];
  }>;
}
