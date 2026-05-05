import dayjs from 'dayjs';
import summaryFixture from './fixtures/summary.json';
import { RANGE_BASELINE_DAYS } from '../constants';
import type { PageRecord } from '../types';

function inclusiveDayCount(startIso: string, endIso: string): number {
  const start = dayjs(startIso).startOf('day');
  const end = dayjs(endIso).startOf('day');
  return Math.max(1, end.diff(start, 'day') + 1);
}

function clampedRangeFactor(startIso: string, endIso: string): number {
    const raw = inclusiveDayCount(startIso, endIso) / RANGE_BASELINE_DAYS;
    return Math.min(12, Math.max(1 / RANGE_BASELINE_DAYS, raw));
  }

/** Length-based scale plus a tiny jitter so different calendar ranges are not identical when length matches. */
export function rangeScale(startIso: string, endIso: string): number {
    const base = clampedRangeFactor(startIso, endIso);
    let h = 0;
    for (const c of startIso + endIso) {
      h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
    }
    const jitter = 1 + ((Math.abs(h) % 501) - 250) / 8000;
    return Math.min(12, Math.max(1 / RANGE_BASELINE_DAYS, base * jitter));
  }

export function scaleSummaryData(startIso: string, endIso: string) {
    const factor = rangeScale(startIso, endIso);
    const d = summaryFixture.data;
  
    return {
      pageviews: {
        value: Math.round(d.pageviews.value * factor),
        trend: +(
          d.pageviews.trend *
          Math.min(1.4, Math.max(0.65, Math.sqrt(factor)))
        ).toFixed(1),
      },
      unique_visitors: {
        value: Math.round(d.unique_visitors.value * factor),
        trend: +(
          d.unique_visitors.trend *
          Math.min(1.4, Math.max(0.65, Math.sqrt(factor)))
        ).toFixed(1),
      },
      avg_time_on_page: {
        value: Math.round(
          d.avg_time_on_page.value *
            Math.min(1.15, Math.max(0.85, 1 / Math.sqrt(factor))),
        ),
        trend: +(d.avg_time_on_page.trend * Math.min(1.2, factor)).toFixed(1),
      },
      bounce_rate: {
        value: Math.min(
          95,
          Math.max(
            5,
            +(d.bounce_rate.value + (factor - 1) * 3.5).toFixed(1),
          ),
        ),
        trend: +(d.bounce_rate.trend + (1 - factor) * 1.2).toFixed(1),
      },
    };
  }

export function scalePageRecord(row: PageRecord, factor: number): PageRecord {
  return {
    ...row,
    pageviews: Math.round(row.pageviews * factor),
    unique_visitors: Math.round(row.unique_visitors * factor),
    avg_time_on_page: Math.round(
      row.avg_time_on_page *
        Math.min(1.15, Math.max(0.85, 1 / Math.sqrt(factor))),
    ),
    bounce_rate: Math.min(
      95,
      Math.max(5, +(row.bounce_rate + (factor - 1) * 2.5).toFixed(1)),
    ),
  };
}

export function comparePages(
  a: PageRecord,
  b: PageRecord,
  sortBy: string,
  order: 'asc' | 'desc',
): number {
  let cmp: number;
  switch (sortBy) {
    case 'title':
      cmp = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      break;
    case 'pageviews':
      cmp = a.pageviews - b.pageviews;
      break;
    case 'unique_visitors':
      cmp = a.unique_visitors - b.unique_visitors;
      break;
    case 'avg_time_on_page':
      cmp = a.avg_time_on_page - b.avg_time_on_page;
      break;
    case 'bounce_rate':
      cmp = a.bounce_rate - b.bounce_rate;
      break;
    default:
      cmp = a.pageviews - b.pageviews;
  }
  return order === 'asc' ? cmp : -cmp;
}