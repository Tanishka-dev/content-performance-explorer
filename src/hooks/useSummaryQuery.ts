import { useQuery } from '@tanstack/react-query';
import { getSummary } from '../api/services';

export function useSummaryQuery(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['summary', startDate, endDate],
    queryFn: () => getSummary(startDate, endDate),
    enabled: Boolean(startDate && endDate),
  });
}
