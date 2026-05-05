import type { PagesQueryParams, PagesResponse, SummaryResponse, PageTimeseriesResponse } from './types';
import { buildSummaryUrl, buildPagesUrl } from '../utils';

export async function getSummary(
  startDate: string,
  endDate: string,
  init?: RequestInit,
): Promise<SummaryResponse> {
  const response = await fetch(buildSummaryUrl(startDate, endDate), init);

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GET /api/summary failed (${response.status}): ${detail}`);
  }

  return (await response.json()) as SummaryResponse;
}

export async function getPages(
  params: PagesQueryParams,
  init?: RequestInit,
): Promise<PagesResponse> {
  const response = await fetch(buildPagesUrl(params), init);

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GET /api/pages failed (${response.status}): ${detail}`);
  }

  return (await response.json()) as PagesResponse;
}

function buildPageTimeseriesUrl(
  pageId: string,
  startDate: string,
  endDate: string,
): string {
  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
  });
  return `/api/pages/${encodeURIComponent(pageId)}/timeseries?${params}`;
}

export async function getPageTimeseries(
  pageId: string,
  startDate: string,
  endDate: string,
  init?: RequestInit,
): Promise<PageTimeseriesResponse> {
  const response = await fetch(
    buildPageTimeseriesUrl(pageId, startDate, endDate),
    init,
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `GET /api/pages/${pageId}/timeseries failed (${response.status}): ${detail}`,
    );
  }

  return (await response.json()) as PageTimeseriesResponse;
}
