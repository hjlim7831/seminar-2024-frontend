import styled from '@emotion/styled';

type ScoreProps = {
  score: number;
};

const ScoreWrapper = styled.div`
  font-size: 1.5em;
  color: #776e65;
`;

export const Score = ({ score }: ScoreProps) => {
  return <ScoreWrapper>Score: {score}</ScoreWrapper>;
};
