import styled from 'styled-components';

export const ExplorerLayout = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const TablePostWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
