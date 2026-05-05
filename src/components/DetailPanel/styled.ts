import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

export const PanelWrapper = styled.aside`
  flex: 0 0 320px;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 12px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: flex-start;

  @media (max-width: 960px) {
    flex: 1 1 auto;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const Title = styled(Typography)`
  && {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111;
    letter-spacing: -0.01em;
  }
` as typeof Typography;

export const Path = styled(Typography)`
  && {
    font-size: 12px;
    color: #9ca3af;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
` as typeof Typography;

export const CloseButton = styled(IconButton)`
  && {
    color: #9ca3af;
    padding: 4px;
  }

  &&:hover {
    color: #555;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
`;


export const StatusChip = styled(Chip)`
  && {
    height: 22px;
    font-size: 11px;
    font-weight: 500;
    border-radius: 6px;
    background-color: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
  }

  && .MuiChip-label {
    padding: 0 8px;
  }
`;