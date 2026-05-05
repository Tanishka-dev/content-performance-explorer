import type { ReactNode } from 'react';
import { RowLabel, RowValue, RowWrapper } from './styled';

type Props = {
  label: string;
  value: ReactNode;
};

export default function DetailRow({ label, value }: Props) {
  return (
    <RowWrapper>
      <RowLabel variant="body2" component="span">
        {label}
      </RowLabel>
      {typeof value === 'string' || typeof value === 'number' ? (
        <RowValue variant="body2" component="span">
          {value}
        </RowValue>
      ) : (
        value
      )}
    </RowWrapper>
  );
}
