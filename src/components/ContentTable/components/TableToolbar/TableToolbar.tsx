import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { Section } from '../../../../types';
import {
  Filters,
  FilterButton,
  SearchField,
  StyledSearchIcon,
  ToolbarWrapper,
} from './styled';

type Props = {
  search: string;
  sectionFilter: Section | null;
  sectionOptions: readonly Section[];
  onSearchChange: (value: string) => void;
  onSectionFilterChange: (section: Section | null) => void;
};

export default function TableToolbar({
  search,
  sectionFilter,
  sectionOptions,
  onSearchChange,
  onSectionFilterChange,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (section: Section | null) => {
    onSectionFilterChange(section);
    handleClose();
  };

  return (
    <ToolbarWrapper>
      <SearchField
        size="small"
        placeholder="Search pages..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <StyledSearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      <Filters>
        <FilterButton
          variant="outlined"
          size="small"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={handleOpen}
          $active={sectionFilter !== null}
        >
          {sectionFilter ?? 'Section'}
        </FilterButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            selected={sectionFilter === null}
            onClick={() => handleSelect(null)}
          >
            All sections
          </MenuItem>
          {sectionOptions.map((section) => (
            <MenuItem
              key={section}
              selected={sectionFilter === section}
              onClick={() => handleSelect(section)}
            >
              {section}
            </MenuItem>
          ))}
        </Menu>
      </Filters>
    </ToolbarWrapper>
  );
}
