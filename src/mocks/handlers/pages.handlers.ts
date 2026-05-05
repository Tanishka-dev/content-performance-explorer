import { http, HttpResponse } from 'msw';
import pagesFixture from '../fixtures/pages.json';
import { SORT_FIELDS, VALID_SECTIONS } from '../../constants';
import { comparePages, rangeScale, scalePageRecord } from '../utils';
import type { PageRecord } from '../../types';

export const pagesHandler = http.get('/api/pages', ({ request }) => {
    const url = new URL(request.url);
    const start_date = url.searchParams.get('start_date');
    const end_date = url.searchParams.get('end_date');

    if (!start_date || !end_date) {
      return HttpResponse.json(
        { error: 'start_date and end_date query params are required' },
        { status: 400 },
      );
    }

    const searchRaw = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const sectionRaw = url.searchParams.get('section')?.toLowerCase();
    const sortByRaw = url.searchParams.get('sort_by') ?? 'pageviews';
    const sort_by = SORT_FIELDS.has(sortByRaw) ? sortByRaw : 'pageviews';
    const sort_order =
      url.searchParams.get('sort_order') === 'asc' ? 'asc' : 'desc';

    const page = Math.max(
      1,
      parseInt(url.searchParams.get('page') ?? '1', 10) || 1,
    );
    const per_page = Math.min(
      100,
      Math.max(1, parseInt(url.searchParams.get('per_page') ?? '20', 10) || 20),
    );

    const factor = rangeScale(start_date, end_date);
    let rows: PageRecord[] = pagesFixture.data.map((row) =>
      scalePageRecord(row, factor),
    );

    if (sectionRaw && VALID_SECTIONS.has(sectionRaw)) {
      rows = rows.filter((r) => r.section === sectionRaw);
    }

    if (searchRaw) {
      rows = rows.filter(
        (r) =>
          r.title.toLowerCase().includes(searchRaw) ||
          r.path.toLowerCase().includes(searchRaw),
      );
    }

    rows.sort((a, b) => comparePages(a, b, sort_by, sort_order));

    const total = rows.length;
    const total_pages = Math.max(1, Math.ceil(total / per_page));
    const safePage = Math.min(page, total_pages);
    const startIdx = (safePage - 1) * per_page;
    const slice = rows.slice(startIdx, startIdx + per_page);

    return HttpResponse.json({
      data: slice,
      meta: {
        total,
        page: safePage,
        per_page,
        total_pages,
      },
      period: { start_date, end_date },
    });
});