import { useQuery } from '@tanstack/react-query';
import type { PageTimeseriesResponse } from '../api/types';
import { getPageTimeseries } from '../api/services';

export function usePageTimeseriesQuery(
  pageId: string | undefined,
  startDate: string,
  endDate: string,
) {
  return useQuery<PageTimeseriesResponse, Error>({
    queryKey: ['timeseries', pageId, startDate, endDate],
    queryFn: ({ signal }) =>
      getPageTimeseries(pageId!, startDate, endDate, { signal }),
    enabled: Boolean(pageId && startDate && endDate),
    placeholderData: (
      previousData: PageTimeseriesResponse | undefined,
    ): PageTimeseriesResponse | undefined => {
      if (!pageId || !previousData) return undefined;
      if (previousData.data.page_id !== pageId) return undefined;
      return previousData;
    },
  });
}
