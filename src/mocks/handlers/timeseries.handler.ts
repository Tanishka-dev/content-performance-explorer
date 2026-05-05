import { http, HttpResponse } from 'msw';
import { TIMESERIES_BY_PAGE_ID } from '../../constants';

export const timeseriesHandler = http.get(
  '/api/pages/:id/timeseries',
  ({ params, request }) => {
    const url = new URL(request.url);
    const start_date = url.searchParams.get('start_date');
    const end_date = url.searchParams.get('end_date');

    if (!start_date || !end_date) {
      return HttpResponse.json(
        { error: 'start_date and end_date query params are required' },
        { status: 400 }
      );
    }

    const pageId = params.id as string;
    const fixture = TIMESERIES_BY_PAGE_ID[pageId];

    const points = fixture
      ? fixture.data.points.filter(
          (p) => p.date >= start_date && p.date <= end_date
        )
      : [];

    return HttpResponse.json({
      data: {
        page_id: fixture?.data.page_id ?? pageId,
        points,
      },
      period: { start_date, end_date },
    });
  }
);