import styled from '@emotion/styled';
import type React from 'react';

import { buttonColors } from '../styles/buttonColor';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color: keyof typeof buttonColors;
  name: string;
  onClick?: () => void;
};

const StyledButton = styled.button<{ color: keyof typeof buttonColors }>`
  padding: 10px 20px;
  color: #f9f6f2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ color }) => buttonColors[color].base};

  &:hover {
    background-color: ${({ color }) => buttonColors[color].hover};
  }
`;

export const Button = ({ name, color, onClick, ...props }: ButtonProps) => {
  const handleOnClick = () => {
    onClick?.();
  };

  return (
    <StyledButton color={color} onClick={handleOnClick} {...props}>
      {name}
    </StyledButton>
  );
};
