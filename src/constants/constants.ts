import type { Section } from '../types';
import timeseriesPg01 from '../mocks/fixtures/timeseries/pg_01.json';
import timeseriesPg02 from '../mocks/fixtures/timeseries/pg_02.json';
import timeseriesPg03 from '../mocks/fixtures/timeseries/pg_03.json';
import timeseriesPg04 from '../mocks/fixtures/timeseries/pg_04.json';
import timeseriesPg05 from '../mocks/fixtures/timeseries/pg_05.json';
import timeseriesPg06 from '../mocks/fixtures/timeseries/pg_06.json';
import timeseriesPg07 from '../mocks/fixtures/timeseries/pg_07.json';
import timeseriesPg08 from '../mocks/fixtures/timeseries/pg_08.json';
import timeseriesPg09 from '../mocks/fixtures/timeseries/pg_09.json';
import timeseriesPg10 from '../mocks/fixtures/timeseries/pg_10.json';

type TimeseriesFixture = (typeof timeseriesPg01);

export const TIMESERIES_BY_PAGE_ID: Record<string, TimeseriesFixture> = {
  pg_01: timeseriesPg01,
  pg_02: timeseriesPg02,
  pg_03: timeseriesPg03,
  pg_04: timeseriesPg04,
  pg_05: timeseriesPg05,
  pg_06: timeseriesPg06,
  pg_07: timeseriesPg07,
  pg_08: timeseriesPg08,
  pg_09: timeseriesPg09,
  pg_10: timeseriesPg10,
};


export const RANGE_BASELINE_DAYS = 30;

export const SECTION_LABEL: Record<string, Section> = {
    blog: 'Blog',
    docs: 'Docs',
    product: 'Product',
    company: 'Company',
    marketing: 'Marketing',
  };

export const VALID_SECTIONS = new Set([
    'blog',
    'docs',
    'product',
    'company',
    'marketing',
]);
  
export const SORT_FIELDS = new Set([
    'pageviews',
    'unique_visitors',
    'avg_time_on_page',
    'bounce_rate',
    'title',
]);
  