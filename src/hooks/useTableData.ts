import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import type { PagesSortBy } from '../api/types';
import type { Section, SortDirection, SortKey } from '../types';
import { getPages } from '../api/services';
import { mapPageRecordToContentRow, sectionToApiParam, sortKeyToPagesSortBy } from '../utils';

export const TABLE_SECTION_OPTIONS: readonly Section[] = [
  'Blog',
  'Docs',
  'Product',
  'Company',
  'Marketing',
];

const DEFAULT_SORT_KEY: SortKey = 'views';
const DEFAULT_SORT_DIRECTION: SortDirection = 'desc';

export function useTableData(startIso: string, endIso: string) {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState<Section | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>(DEFAULT_SORT_KEY);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(DEFAULT_SORT_DIRECTION);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pagesQuery = useQuery({
    queryKey: [
      'pages',
      startIso,
      endIso,
      search,
      sectionFilter,
      sortBy,
      sortDirection,
      page,
      pageSize,
    ],
    queryFn: ({ signal }) => {
      const sort_by: PagesSortBy = sortKeyToPagesSortBy(sortBy);
      return getPages(
        {
          start_date: startIso,
          end_date: endIso,
          search: search.trim() || undefined,
          section: sectionFilter
            ? sectionToApiParam(sectionFilter)
            : undefined,
          sort_by,
          sort_order: sortDirection,
          page: page + 1,
          per_page: pageSize,
        },
        { signal },
      );
    },
    enabled: Boolean(startIso && endIso),
    placeholderData: keepPreviousData,
  });

  const paginatedRows = useMemo(
    () =>
      (pagesQuery.data?.data ?? []).map((record) =>
        mapPageRecordToContentRow(record),
      ),
    [pagesQuery.data],
  );

  const totalCount = pagesQuery.data?.meta.total ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleSectionFilterChange = (section: Section | null) => {
    setSectionFilter(section);
    setPage(0);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(0);
  };

  const handleSortChange = (key: SortKey) => {
    if (sortBy === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDirection(key === 'page' ? 'asc' : 'desc');
    }
    setPage(0);
  };

  return {
    search,
    sectionFilter,
    sortBy,
    sortDirection,
    page,
    pageSize,
    paginatedRows,
    totalCount,
    pagesLoading: pagesQuery.isLoading,
    pagesFetching: pagesQuery.isFetching,
    pagesError: pagesQuery.isError
      ? pagesQuery.error instanceof Error
        ? pagesQuery.error
        : new Error('Failed to load pages')
      : null,
    sectionOptions: TABLE_SECTION_OPTIONS,
    handleSearchChange,
    handleSectionFilterChange,
    handleSortChange,
    handlePageSizeChange,
    setPage,
  };
}
