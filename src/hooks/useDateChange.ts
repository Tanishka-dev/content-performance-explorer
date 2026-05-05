import { useCallback, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import dayjs, { type Dayjs } from 'dayjs';

const DEFAULT_RANGE_DAYS = 30;

export type ResolvedDateRange = {
  start: Dayjs;
  end: Dayjs;
};

export function useDateChange() {
  const [startDate, setStartDate] = useState<Dayjs | null>(() =>
    dayjs().startOf('day').subtract(DEFAULT_RANGE_DAYS - 1, 'day'),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(() =>
    dayjs().startOf('day'),
  );

  const [pickerAnchor, setPickerAnchor] = useState<HTMLElement | null>(null);
  const [rangeAnchor, setRangeAnchor] = useState<Dayjs | null>(null);

  const resolvedRange: ResolvedDateRange = useMemo(
    () => ({
      start:
        startDate ??
        dayjs().startOf('day').subtract(DEFAULT_RANGE_DAYS - 1, 'day'),
      end: endDate ?? dayjs().startOf('day'),
    }),
    [startDate, endDate],
  );

  const startIso = resolvedRange.start.format('YYYY-MM-DD');
  const endIso = resolvedRange.end.format('YYYY-MM-DD');

  const applyRange = useCallback((start: Dayjs, end: Dayjs) => {
    const a = start.startOf('day');
    const b = end.startOf('day');
    setStartDate(a.isBefore(b) ? a : b);
    setEndDate(a.isBefore(b) ? b : a);
  }, []);

  const closePicker = useCallback(() => {
    setPickerAnchor(null);
    setRangeAnchor(null);
  }, []);

  const openPicker = useCallback((event: MouseEvent<HTMLElement>) => {
    setPickerAnchor(event.currentTarget);
    setRangeAnchor(null);
  }, []);

  const handleCalendarChange = useCallback(
    (next: Dayjs | null) => {
      if (!next) return;
      const d = next.startOf('day');
      if (!rangeAnchor) {
        setRangeAnchor(d);
        return;
      }
      if (rangeAnchor.isSame(d, 'day')) {
        return;
      }
      applyRange(rangeAnchor, d);
      closePicker();
    },
    [rangeAnchor, applyRange, closePicker],
  );

  const pickerOpen = Boolean(pickerAnchor);

  const calendarReferenceDate =
    rangeAnchor ?? resolvedRange.start;

  return {
    startDate,
    endDate,
    resolvedRange,
    startIso,
    endIso,
    pickerAnchor,
    pickerOpen,
    rangeAnchor,
    openPicker,
    closePicker,
    handleCalendarChange,
    calendarReferenceDate,
  };
}
