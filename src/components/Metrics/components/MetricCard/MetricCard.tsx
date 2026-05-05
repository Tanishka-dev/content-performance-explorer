import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Delta, DeltaText, Label, Muted, StyledCard, Value } from './styled';
import type { Trend } from '../../../../types';

type Props = {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
};

export default function MetricCard({
  label,
  value,
  delta,
  trend,
}: Props) {
  const ArrowIcon = trend === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <StyledCard elevation={0}>
      <Label variant="body2" component="div">
        {label}
      </Label>
      <Value variant="h4" component="div">
        {value}
      </Value>
      <Delta $trend={trend}>
        <ArrowIcon style={{ color: trend === 'up' ? '#16a34a' : '#dc2626' }} />
        <DeltaText variant="caption" component="span">
          {delta}
        </DeltaText>
        <Muted variant="caption" component="span">
          vs prev period
        </Muted>
      </Delta>
    </StyledCard>
  );
}
