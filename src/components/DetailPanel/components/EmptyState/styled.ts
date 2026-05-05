import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 16px;
  gap: 8px;
  min-height: 220px;
`;

export const EmptyIconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f4f4f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  margin-bottom: 4px;

  svg {
    font-size: 24px;
  }
`;

export const EmptyTitle = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
  }
` as typeof Typography;

export const EmptyText = styled(Typography)`
  && {
    font-size: 12px;
    color: #9ca3af;
    max-width: 220px;
    line-height: 1.5;
  }
` as typeof Typography;
