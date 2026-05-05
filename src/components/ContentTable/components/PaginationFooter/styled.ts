import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export const PageInfo = styled(Typography)`
  && {
    font-size: 13px;
    color: #555;
  }
` as typeof Typography;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid #ececec;
  font-size: 13px;
  color: #555;
`;

export const PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const NavIconButton = styled(IconButton)`
  && {
    padding: 4px;
    color: #555;
  }

  &&:disabled {
    color: #ccc;
  }
`;

export const PageSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
`;

export const PageSizeSelect = styled(Select)`
  && {
    font-size: 13px;
    color: #444;
  }

  && .MuiOutlinedInput-notchedOutline {
    border-color: #ececec;
  }

  &&:hover .MuiOutlinedInput-notchedOutline {
    border-color: #d9d9d9;
  }

  && .MuiSelect-select {
    padding: 4px 28px 4px 10px;
  }
` as typeof Select;
