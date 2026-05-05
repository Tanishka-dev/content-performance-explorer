import Alert from '@mui/material/Alert';
import Header from '../Header/Header';
import MetricCards from '../Metrics/MetricCards';
import ContentTable from '../ContentTable';
import DetailPanel from '../DetailPanel';
import { useContentData } from '../../hooks/useContentData';
import { ExplorerLayout, TablePostWrapper } from './styled';

export default function ContentExplorer() {
  const {
    metrics,
    summaryLoading,
    summaryMetricError,
    paginatedRows,
    totalCount,
    pagesError,
    search,
    sectionFilter,
    sortBy,
    sortDirection,
    page,
    pageSize,
    selectedId,
    detailPanelData,
    sectionOptions,
    handleRefresh,
    handleSearchChange,
    handleSectionFilterChange,
    handleSortChange,
    handlePageSizeChange,
    setPage,
    setSelectedId,
    headerDateRange,
  } = useContentData();

  return (
    <ExplorerLayout>
      <Header {...headerDateRange} onRefresh={handleRefresh} />
      <MetricCards
        metrics={metrics}
        loading={summaryLoading}
        error={summaryMetricError}
      />
      {pagesError ? (
        <Alert severity="error" sx={{ mx: 2, mb: 1 }}>
          {pagesError.message}
        </Alert>
      ) : null}
      <TablePostWrapper>
        <ContentTable
          rows={paginatedRows}
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          search={search}
          sectionFilter={sectionFilter}
          sectionOptions={sectionOptions}
          sortBy={sortBy}
          sortDirection={sortDirection}
          selectedId={selectedId}
          onSearchChange={handleSearchChange}
          onSectionFilterChange={handleSectionFilterChange}
          onSortChange={handleSortChange}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
          onRowSelect={setSelectedId}
        />
        <DetailPanel
          data={detailPanelData}
          onClose={() => setSelectedId(undefined)}
        />
      </TablePostWrapper>
    </ExplorerLayout>
  );
}
