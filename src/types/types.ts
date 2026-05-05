import pagesFixture from '../mocks/fixtures/pages.json';

export type DetailPanelData = {
    title: string;
    path: string;
    section: string;
    status: 'Published' | 'Draft';
    firstPublished: string;
    totalViews: number;
    uniques: number;
    avgTime: string;
    dailyViews: number[];
};

export type Metric = {
    label: string;
    value: string;
    delta: string;
    trend: 'up' | 'down';
};
  
export type Trend = 'up' | 'down';

export type Section =
  | 'Blog'
  | 'Docs'
  | 'Product'
  | 'Company'
  | 'Marketing';

export type SortKey = 'page' | 'views' | 'uniques' | 'time' | 'bounce';

export type SortDirection = 'asc' | 'desc';

export type ContentRow = {
  id: string;
  title: string;
  path: string;
  section: Section;
  views: number;
  uniques: number;
  time: string;
  bounce: string;
  blogStatus?: 'Published' | 'Draft';
  blogFirstPublished?: string;
};

export type PageRecord = (typeof pagesFixture.data)[number];