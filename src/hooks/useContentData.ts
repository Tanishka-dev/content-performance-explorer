import { useMemo, useState } from 'react';
import { queryClient } from '../api/queryClient';
import { useSummaryQuery } from './useSummaryQuery';
import { usePageTimeseriesQuery } from './usePageTimeseriesQuery.ts';
import { useDateChange } from './useDateChange';
import { useTableData } from './useTableData';
import { buildDetailpanelData, mapSummaryToMetrics } from '../utils';

export function useContentData() {
  const dates = useDateChange();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const {
    data: summaryData,
    isLoading: summaryLoading,
    isError: summaryIsError,
    error: summaryError,
  } = useSummaryQuery(dates.startIso, dates.endIso);

  const metrics = useMemo(
    () => (summaryData ? mapSummaryToMetrics(summaryData) : []),
    [summaryData],
  );

  const table = useTableData(dates.startIso, dates.endIso);

  const timeseriesQuery = usePageTimeseriesQuery(
    selectedId,
    dates.startIso,
    dates.endIso,
  );

  const selectedRow = useMemo(
    () => table.paginatedRows.find((r) => r.id === selectedId),
    [table.paginatedRows, selectedId],
  );

  const detailPanelData = useMemo(() => {
    if (!selectedRow) return undefined;
    const points = timeseriesQuery.data?.data.points ?? [];
    const dailyViews = points.map((p) => p.pageviews);
    return buildDetailpanelData(selectedRow, dailyViews);
  }, [selectedRow, timeseriesQuery.data]);

  const summaryMetricError =
    summaryIsError
      ? summaryError instanceof Error
        ? summaryError
        : new Error('Failed to load summary')
      : null;

  const handleRefresh = () => {
    void queryClient.invalidateQueries({ queryKey: ['summary'] });
    void queryClient.invalidateQueries({ queryKey: ['pages'] });
    void queryClient.invalidateQueries({ queryKey: ['timeseries'] });
  };

  return {
    metrics,
    summaryLoading,
    summaryMetricError,
    paginatedRows: table.paginatedRows,
    totalCount: table.totalCount,
    pagesError: table.pagesError,
    search: table.search,
    sectionFilter: table.sectionFilter,
    sortBy: table.sortBy,
    sortDirection: table.sortDirection,
    page: table.page,
    pageSize: table.pageSize,
    selectedId,
    detailPanelData,
    sectionOptions: table.sectionOptions,
    handleRefresh,
    handleSearchChange: table.handleSearchChange,
    handleSectionFilterChange: table.handleSectionFilterChange,
    handleSortChange: table.handleSortChange,
    handlePageSizeChange: table.handlePageSizeChange,
    setPage: table.setPage,
    setSelectedId,
    headerDateRange: {
      resolvedRange: dates.resolvedRange,
      pickerAnchor: dates.pickerAnchor,
      pickerOpen: dates.pickerOpen,
      rangeAnchor: dates.rangeAnchor,
      openPicker: dates.openPicker,
      closePicker: dates.closePicker,
      handleCalendarChange: dates.handleCalendarChange,
      calendarReferenceDate: dates.calendarReferenceDate,
    },
  };
}
