import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }
`;

export const RowLabel = styled(Typography)`
  && {
    font-size: 13px;
    color: #6b7280;
  }
` as typeof Typography;

export const RowValue = styled(Typography)`
  && {
    font-size: 13px;
    color: #111;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
` as typeof Typography;