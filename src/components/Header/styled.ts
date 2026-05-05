import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Title = styled(Typography)`
  && {
    margin: 0;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #111;
  }
` as typeof Typography;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const RangeTriggerButton = styled(Button)`
  && {
    text-transform: none;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    color: #333;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    min-width: 220px;
    justify-content: flex-start;
    box-shadow: none;
  }

  &&:hover {
    background-color: #f5f5f5;
    border-color: #bdbdbd;
    box-shadow: none;
  }
`;

export const CalendarPopoverPaper = styled(Paper)`
  padding: 12px 16px 16px;
  margin-top: 8px;
  border-radius: 12px;
`;

export const RefreshButton = styled(Button)`
  && {
    text-transform: none;
    background-color: #fff;
    border-color: #e0e0e0;
    color: #333;
    border-radius: 8px;
    padding: 6px 16px;
    font-size: 13px;
    box-shadow: none;
  }

  &&:hover {
    background-color: #f5f5f5;
    border-color: #bdbdbd;
    box-shadow: none;
  }
`;
