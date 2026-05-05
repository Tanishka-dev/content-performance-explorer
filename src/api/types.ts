import type { SortDirection } from '../types';

export type SummaryMetric = {
    value: number;
    trend: number;
  };
  
  export type SummaryResponse = {
    data: {
      pageviews: SummaryMetric;
      unique_visitors: SummaryMetric;
      avg_time_on_page: SummaryMetric;
      bounce_rate: SummaryMetric;
    };
    period: {
      start_date: string;
      end_date: string;
    };
  };
  
  export type PagesSortBy =
    | 'pageviews'
    | 'unique_visitors'
    | 'avg_time_on_page'
    | 'bounce_rate'
    | 'title';
  
  export type PageApiRecord = {
    id: string;
    path: string;
    title: string;
    section: string;
    status: string;
    first_published: string;
    pageviews: number;
    unique_visitors: number;
    avg_time_on_page: number;
    bounce_rate: number;
  };
  
  export type PagesResponse = {
    data: PageApiRecord[];
    meta: {
      total: number;
      page: number;
      per_page: number;
      total_pages: number;
    };
    period: {
      start_date: string;
      end_date: string;
    };
  };
  
  export type PagesQueryParams = {
    start_date: string;
    end_date: string;
    search?: string;
    section?: string;
    sort_by?: PagesSortBy;
    sort_order?: SortDirection;
    page?: number;
    per_page?: number;
  };

  export type TimeseriesPoint = {
    date: string;
    pageviews: number;
    unique_visitors: number;
  };
  
  export type PageTimeseriesResponse = {
    data: {
      page_id: string;
      points: TimeseriesPoint[];
    };
    period: {
      start_date: string;
      end_date: string;
    };
  };