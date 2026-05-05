import styled from 'styled-components';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export const StyledCard = styled(Card)`
  && {
    flex: 1 1 0;
    min-width: 200px;
    padding: 20px 22px;
    border-radius: 12px;
    border: 1px solid #ececec;
    box-shadow: none;
    background-color: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  &&:hover {
    border-color: #d9d9d9;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }
`;

export const Label = styled(Typography)`
  && {
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 8px;
  }
` as typeof Typography;

export const Value = styled(Typography)`
  && {
    font-size: 28px;
    font-weight: 600;
    color: #111;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
    line-height: 1.2;
  }
` as typeof Typography;

export const Delta = styled.div<{ $trend: 'up' | 'down' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${({ $trend }) => ($trend === 'up' ? '#16a34a' : '#dc2626')};

  svg {
    font-size: 14px;
  }
`;

export const DeltaText = styled(Typography)`
  && {
    font-size: 12px;
    color: inherit;
    font-weight: 500;
  }
` as typeof Typography;

export const Muted = styled(Typography)`
  && {
    font-size: 12px;
    color: #9ca3af;
  }
` as typeof Typography;