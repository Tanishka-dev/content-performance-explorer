import CloseIcon from '@mui/icons-material/Close';
import DetailRow from './components/DetailRow';
import EmptyState from './components/EmptyState';
import {
  CloseButton,
  Details,
  HeaderText,
  PanelHeader,
  PanelWrapper,
  Path,
  Title,
  StatusChip
} from './styled';
import type { DetailPanelData } from '../../types';

type Props = {
  data?: DetailPanelData;
  onClose?: () => void;
};

const formatNumber = (value: number) => value.toLocaleString('en-US');

export default function DetailPanel({
  data,
  onClose,
}: Props) {
  if (!data) {
    return (
      <PanelWrapper>
        <EmptyState />
      </PanelWrapper>
    );
  }

  return (
    <PanelWrapper>
      <PanelHeader>
        <HeaderText>
          <Title variant="subtitle1" component="h2">
            {data.title}
          </Title>
          <Path variant="caption" component="span">
            {data.path}
          </Path>
        </HeaderText>
        <CloseButton size="small" onClick={onClose} aria-label="Close">
          <CloseIcon fontSize="small" />
        </CloseButton>
      </PanelHeader>

      <Details>
        <DetailRow label="Section" value={data.section} />
        <DetailRow
          label="Status"
          value={<StatusChip label={data.status} size="small" />}
        />
        <DetailRow label="First published" value={data.firstPublished} />
        <DetailRow label="Total views" value={formatNumber(data.totalViews)} />
        <DetailRow label="Uniques" value={formatNumber(data.uniques)} />
        <DetailRow label="Avg. time" value={data.avgTime} />
      </Details>
    </PanelWrapper>
  );
}
