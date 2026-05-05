import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableToolbar from './components/TableToolbar';
import PaginationFooter from './components/PaginationFooter';
import type { ContentRow, Section, SortKey, SortDirection } from '../../types';
import {
  BodyCell,
  ClickableRow,
  HeadCell,
  NumericCell,
  PageCell,
  PagePath,
  PageTitle,
  ScrollArea,
  SectionChip,
  StyledSortLabel,
  StyledTable,
  TableWrapper,
} from './styled';

const SECTION_TONE: Record<Section, string> = {
  Blog: '#2563eb',
  Docs: '#7c3aed',
  Product: '#16a34a',
  Company: '#ea580c',
  Marketing: '#db2777',
};

type Props = {
  rows: ContentRow[];
  page: number;
  pageSize: number;
  totalCount: number;
  search: string;
  sectionFilter: Section | null;
  sectionOptions: readonly Section[];
  sortBy: SortKey | null;
  sortDirection: SortDirection;
  selectedId?: string;
  pageSizeOptions?: number[];
  onSearchChange: (value: string) => void;
  onSectionFilterChange: (section: Section | null) => void;
  onSortChange: (sortBy: SortKey) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRowSelect?: (id: string) => void;
};
const formatNumber = (value: number) => value.toLocaleString('en-US');

export default function ContentTable({
  rows,
  page,
  pageSize,
  totalCount,
  search,
  sectionFilter,
  sectionOptions,
  sortBy,
  sortDirection,
  selectedId,
  pageSizeOptions,
  onSearchChange,
  onSectionFilterChange,
  onSortChange,
  onPageChange,
  onPageSizeChange,
  onRowSelect,
}: Props) {
  return (
    <TableWrapper>
      <TableToolbar
        search={search}
        sectionFilter={sectionFilter}
        sectionOptions={sectionOptions}
        onSearchChange={onSearchChange}
        onSectionFilterChange={onSectionFilterChange}
      />

      <ScrollArea>
        <StyledTable>
          <TableHead>
            <ClickableRow $selected={false} hover={false}>
              <HeadCell>
                <StyledSortLabel
                  active={sortBy === 'page'}
                  direction={sortBy === 'page' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('page')}
                >
                  Page
                </StyledSortLabel>
              </HeadCell>
              <HeadCell $width={120}>Section</HeadCell>
              <HeadCell $width={110} align="right">
                <StyledSortLabel
                  active={sortBy === 'views'}
                  direction={sortBy === 'views' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('views')}
                >
                  Views
                </StyledSortLabel>
              </HeadCell>
              <HeadCell $width={110} align="right">
                <StyledSortLabel
                  active={sortBy === 'uniques'}
                  direction={sortBy === 'uniques' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('uniques')}
                >
                  Uniques
                </StyledSortLabel>
              </HeadCell>
              <HeadCell $width={90} align="right">
                <StyledSortLabel
                  active={sortBy === 'time'}
                  direction={sortBy === 'time' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('time')}
                >
                  Time
                </StyledSortLabel>
              </HeadCell>
              <HeadCell $width={90} align="right">
                <StyledSortLabel
                  active={sortBy === 'bounce'}
                  direction={sortBy === 'bounce' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('bounce')}
                >
                  Bounce
                </StyledSortLabel>
              </HeadCell>
            </ClickableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <ClickableRow
                key={row.id}
                $selected={row.id === selectedId}
                onClick={() => onRowSelect?.(row.id)}
              >
                <PageCell>
                  <PageTitle variant="body2" component="div">
                    {row.title}
                  </PageTitle>
                  <PagePath variant="caption" component="div">
                    {row.path}
                  </PagePath>
                </PageCell>
                <BodyCell>
                  <SectionChip
                    label={row.section}
                    $tone={SECTION_TONE[row.section]}
                    size="small"
                    variant="outlined"
                  />
                </BodyCell>
                <NumericCell align="right">
                  {formatNumber(row.views)}
                </NumericCell>
                <NumericCell align="right">
                  {formatNumber(row.uniques)}
                </NumericCell>
                <NumericCell align="right">{row.time}</NumericCell>
                <NumericCell align="right">{row.bounce}</NumericCell>
              </ClickableRow>
            ))}
          </TableBody>
        </StyledTable>
      </ScrollArea>

      <PaginationFooter
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </TableWrapper>
  );
}
