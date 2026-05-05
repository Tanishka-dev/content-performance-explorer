import { Alert } from '@mui/material';
import MetricCard from './components/MetricCard';
import type { Metric } from '../../types';
import { Grid } from './styled';

const SKELETON_METRICS: Metric[] = [
  { label: 'Pageviews', value: '—', delta: '—', trend: 'up' },
  { label: 'Unique visitors', value: '—', delta: '—', trend: 'up' },
  { label: 'Avg. time on page', value: '—', delta: '—', trend: 'up' },
  {
    label: 'Bounce rate',
    value: '—',
    delta: '—',
    trend: 'down',
  },
];

type Props = {
  metrics: Metric[];
  loading?: boolean;
  error?: Error | null;
};

export default function MetricCards({ metrics, loading, error }: Props) {
  const showSkeleton = Boolean(loading && metrics.length === 0);
  const displayMetrics = showSkeleton ? SKELETON_METRICS : metrics;

  return (
    <>
      {error && metrics.length === 0 ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      ) : null}
      <Grid>
        {displayMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </Grid>
    </>
  );
}
