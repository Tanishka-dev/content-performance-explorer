import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import {
  EmptyIconCircle,
  EmptyText,
  EmptyTitle,
  EmptyWrapper,
} from './styled';

export default function EmptyState() {
  return (
    <EmptyWrapper>
      <EmptyIconCircle>
        <ArticleOutlinedIcon />
      </EmptyIconCircle>
      <EmptyTitle variant="subtitle2" component="div">
        No page selected
      </EmptyTitle>
      <EmptyText variant="caption" component="div">
        Click any row in the table to see its full metrics.
      </EmptyText>
    </EmptyWrapper>
  );
}
