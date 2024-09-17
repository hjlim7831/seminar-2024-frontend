// src/components/Score.tsx
import '../styles/Score.scss';

type ScoreProps = {
  score: number;
};

export const Score = ({ score }: ScoreProps) => {
  return <div className="score">Score: {score}</div>;
};
