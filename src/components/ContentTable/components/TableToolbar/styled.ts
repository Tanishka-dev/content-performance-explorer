import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export const StyledSearchIcon = styled(SearchIcon)`
  && {
    font-size: 18px;
    color: #9ca3af;
  }
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #ececec;
  flex-wrap: wrap;
`;

export const SearchField = styled(TextField)`
  && {
    flex: 1 1 320px;
    max-width: 420px;
  }

  && .MuiOutlinedInput-root {
    background-color: #fafafa;
    border-radius: 8px;
    font-size: 13px;
  }

  && .MuiInputBase-input {
    padding: 8px 12px;
  }

  && .MuiOutlinedInput-notchedOutline {
    border-color: #ececec;
  }

  &&
    .MuiOutlinedInput-root:hover
    .MuiOutlinedInput-notchedOutline {
    border-color: #d9d9d9;
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled(Button)<{ $active?: boolean }>`
  && {
    text-transform: none;
    background-color: ${({ $active }) => ($active ? '#eef2ff' : '#fff')};
    border-color: ${({ $active }) => ($active ? '#c7d2fe' : '#ececec')};
    color: ${({ $active }) => ($active ? '#3730a3' : '#444')};
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 13px;
    box-shadow: none;
    min-width: 0;
  }

  &&:hover {
    background-color: ${({ $active }) => ($active ? '#e0e7ff' : '#f5f5f5')};
    border-color: ${({ $active }) => ($active ? '#a5b4fc' : '#d9d9d9')};
    box-shadow: none;
  }
`;
