import { http, HttpResponse } from 'msw';
import { scaleSummaryData } from '../utils';

export const summaryHandler = http.get('/api/summary', ({ request }) => {
  const url = new URL(request.url);
  const start_date = url.searchParams.get('start_date');
  const end_date = url.searchParams.get('end_date');

  if (!start_date || !end_date) {
    return HttpResponse.json(
      { error: 'start_date and end_date query params are required' },
      { status: 400 }
    );
  }

  return HttpResponse.json({
    data: scaleSummaryData(start_date, end_date),
    period: { start_date, end_date },
  });
});