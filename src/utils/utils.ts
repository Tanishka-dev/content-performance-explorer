import type { DetailPanelData, Metric } from '../types';
import type { SummaryResponse, PageApiRecord, PagesSortBy, PagesQueryParams,  } from '../api/types';
import type { ContentRow, Section, SortKey } from '../types';
import dayjs from 'dayjs';
import { SECTION_LABEL } from '../constants';


export function buildDetailpanelData(
  row: ContentRow,
  dailyViews: number[],
): DetailPanelData {
  return {
    title: row.title,
    path: row.path,
    section: row.section,
    status: row.blogStatus ?? 'Published',
    firstPublished: row.blogFirstPublished ?? '—',
    totalViews: row.views,
    uniques: row.uniques,
    avgTime: row.time,
    dailyViews,
  };
}

function formatSecondsAsClock(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${minutes}m ${seconds}s`;
  }
  
  function trendDirection(trend: number): 'up' | 'down' {
    return trend >= 0 ? 'up' : 'down';
  }
  
  export function mapSummaryToMetrics(summary: SummaryResponse): Metric[] {
    const { data } = summary;
    return [
      {
        label: 'Pageviews',
        value: data.pageviews.value.toLocaleString('en-US'),
        delta: `${Math.abs(data.pageviews.trend).toFixed(1)}%`,
        trend: trendDirection(data.pageviews.trend),
      },
      {
        label: 'Unique visitors',
        value: data.unique_visitors.value.toLocaleString('en-US'),
        delta: `${Math.abs(data.unique_visitors.trend).toFixed(1)}%`,
        trend: trendDirection(data.unique_visitors.trend),
      },
      {
        label: 'Avg. time on page',
        value: formatSecondsAsClock(data.avg_time_on_page.value),
        delta: `${Math.abs(data.avg_time_on_page.trend).toFixed(1)}%`,
        trend: trendDirection(data.avg_time_on_page.trend),
      },
      {
        label: 'Bounce rate',
        value: `${data.bounce_rate.value.toFixed(1)}%`,
        delta: `${Math.abs(data.bounce_rate.trend).toFixed(1)}%`,
        trend: trendDirection(data.bounce_rate.trend),
      },
    ];
  }
  

  function formatDurationSeconds(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
  
  function formatBounce(rate: number): string {
    return Number.isInteger(rate) ? `${rate}%` : `${rate.toFixed(1)}%`;
  }
  
  export function mapPageRecordToContentRow(record: PageApiRecord): ContentRow {
    const section = SECTION_LABEL[record.section] ?? 'Blog';
    const published = record.status.toLowerCase() === 'published';
  
    return {
      id: record.id,
      title: record.title,
      path: record.path,
      section,
      views: record.pageviews,
      uniques: record.unique_visitors,
      time: formatDurationSeconds(record.avg_time_on_page),
      bounce: formatBounce(record.bounce_rate),
      blogStatus: published ? 'Published' : 'Draft',
      blogFirstPublished: dayjs(record.first_published).format('MMM D, YYYY'),
    };
  }
  
  export function sortKeyToPagesSortBy(sortKey: SortKey): PagesSortBy {
    const map: Record<SortKey, PagesSortBy> = {
      page: 'title',
      views: 'pageviews',
      uniques: 'unique_visitors',
      time: 'avg_time_on_page',
      bounce: 'bounce_rate',
    };
    return map[sortKey];
  }
  
  export function sectionToApiParam(section: Section): string {
    return section.toLowerCase();
  }
  
  export function buildSummaryUrl(startDate: string, endDate: string): string {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    });
    return `/api/summary?${params}`;
  }
  
  export function buildPagesUrl(params: PagesQueryParams): string {
    const search = new URLSearchParams({
      start_date: params.start_date,
      end_date: params.end_date,
    });
  
    if (params.search?.trim()) {
      search.set('search', params.search.trim());
    }
    if (params.section) {
      search.set('section', params.section);
    }
    if (params.sort_by) {
      search.set('sort_by', params.sort_by);
    }
    if (params.sort_order) {
      search.set('sort_order', params.sort_order);
    }
    if (params.page != null) {
      search.set('page', String(params.page));
    }
    if (params.per_page != null) {
      search.set('per_page', String(params.per_page));
    }
  
    return `/api/pages?${search}`;
  }