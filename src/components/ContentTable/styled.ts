import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';

export const TableWrapper = styled.section`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 12px;
  overflow: hidden;
  min-width: 0;
`;

export const StyledTable = styled(Table)`
  && {
    table-layout: fixed;
  }
`;

export const HeadCell = styled(TableCell)<{ $width?: number }>`
  && {
    color: #6b7280;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-bottom: 1px solid #ececec;
    padding: 12px 16px;
    background-color: #fafafa;
    ${({ $width }) => ($width ? `width: ${$width}px;` : '')}
  }
`;

export const BodyCell = styled(TableCell)`
  && {
    border-bottom: 1px solid #f4f4f4;
    padding: 14px 16px;
    font-size: 13px;
    color: #333;
  }
`;

export const PageCell = styled(BodyCell)`
  && {
    color: #111;
    font-weight: 500;
  }
`;

export const NumericCell = styled(BodyCell)`
  && {
    font-variant-numeric: tabular-nums;
    color: #444;
  }
`;

export const PageTitle = styled(Typography)`
  && {
    font-weight: 500;
    color: #111;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
` as typeof Typography;

export const PagePath = styled(Typography)`
  && {
    font-size: 12px;
    color: #9ca3af;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
` as typeof Typography;

export const ClickableRow = styled(TableRow)<{ $selected: boolean }>`
  && {
    cursor: pointer;
    background-color: ${({ $selected }) =>
      $selected ? '#f0f4ff' : 'transparent'};
  }

  &&:hover {
    background-color: ${({ $selected }) =>
      $selected ? '#e8efff' : '#fafafa'};
  }
`;

export const SectionChip = styled(Chip)<{ $tone: string }>`
  && {
    height: 22px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 6px;
    border: 1px solid ${({ $tone }) => $tone};
    color: ${({ $tone }) => $tone};
    background-color: transparent;
  }

  && .MuiChip-label {
    padding: 0 8px;
  }
`;

export const ScrollArea = styled.div`
  overflow: auto;
  flex: 1 1 auto;
`;

export const StyledSortLabel = styled(TableSortLabel)`
  && {
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
  }

  &&:hover {
    color: #111;
  }

  &&.Mui-active {
    color: #111;
  }

  && .MuiTableSortLabel-icon {
    font-size: 14px;
    color: inherit !important;
    opacity: 1;
  }
`;
