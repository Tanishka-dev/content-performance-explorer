import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from '@mui/material/MenuItem';
import {
  FooterWrapper,
  NavIconButton,
  PageInfo,
  PageNav,
  PageSizeSelect,
  PageSizeWrapper,
} from './styled';

type Props = {
  page: number;
  pageSize: number;
  totalCount: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export default function PaginationFooter({
  page,
  pageSize,
  totalCount,
  pageSizeOptions = [5, 10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages - 1);

  const goPrev = () => onPageChange(Math.max(0, currentPage - 1));
  const goNext = () => onPageChange(Math.min(totalPages - 1, currentPage + 1));

  return (
    <FooterWrapper>
      <PageNav>
        <NavIconButton
          size="small"
          onClick={goPrev}
          disabled={currentPage <= 0}
          aria-label="Previous page"
        >
          <ChevronLeftIcon fontSize="small" />
        </NavIconButton>
        <PageInfo variant="body2" component="span">
          Page {currentPage + 1} of {totalPages}
        </PageInfo>
        <NavIconButton
          size="small"
          onClick={goNext}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRightIcon fontSize="small" />
        </NavIconButton>
      </PageNav>

      <PageSizeWrapper>
        <PageSizeSelect
          size="small"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <MenuItem key={size} value={size}>
              {size} / page
            </MenuItem>
          ))}
        </PageSizeSelect>
      </PageSizeWrapper>
    </FooterWrapper>
  );
}
