import RefreshIcon from '@mui/icons-material/Refresh';
import Popover from '@mui/material/Popover';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type { Dayjs } from 'dayjs';
import type { MouseEvent } from 'react';
import type { ResolvedDateRange } from '../../hooks/useDateChange';
import {
  Actions,
  CalendarPopoverPaper,
  HeaderWrapper,
  RangeTriggerButton,
  RefreshButton,
  Title,
} from './styled';

export type Props = {
  resolvedRange: ResolvedDateRange;
  pickerAnchor: HTMLElement | null;
  pickerOpen: boolean;
  rangeAnchor: Dayjs | null;
  openPicker: (event: MouseEvent<HTMLElement>) => void;
  closePicker: () => void;
  handleCalendarChange: (next: Dayjs | null) => void;
  calendarReferenceDate: Dayjs;
  onRefresh?: () => void;
};

export default function Header({
  resolvedRange,
  pickerAnchor,
  pickerOpen,
  rangeAnchor,
  openPicker,
  closePicker,
  handleCalendarChange,
  calendarReferenceDate,
  onRefresh,
}: Props) {
  const rangeLabel = `${resolvedRange.start.format('MMM D, YYYY')} – ${resolvedRange.end.format('MMM D, YYYY')}`;

  return (
    <HeaderWrapper>
      <Title variant="h4" component="h1">
        Content Performance
      </Title>

      <Actions>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <>
            <RangeTriggerButton
              variant="outlined"
              size="small"
              id="content-performance-date-range"
              aria-expanded={pickerOpen ? 'true' : undefined}
              aria-haspopup="dialog"
              onClick={openPicker}
            >
              {rangeLabel}
            </RangeTriggerButton>

            <Popover
              open={pickerOpen}
              anchorEl={pickerAnchor}
              onClose={closePicker}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              slotProps={{
                paper: {
                  elevation: 8,
                  sx: { overflow: 'visible' },
                },
              }}
            >
              <CalendarPopoverPaper elevation={0}>
                <DateCalendar
                  referenceDate={calendarReferenceDate}
                  value={rangeAnchor}
                  onChange={handleCalendarChange}
                  disableFuture
                />
              </CalendarPopoverPaper>
            </Popover>
          </>
        </LocalizationProvider>

        <RefreshButton
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
        >
          Refresh
        </RefreshButton>
      </Actions>
    </HeaderWrapper>
  );
}
