import '../styles/Button.scss';

import type React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  color: 'yellow' | 'brown' | 'orange';
  name: string;
  onClick?: () => void;
};

export const Button = ({
  className = '',
  name,
  color,
  onClick,
  ...props
}: ButtonProps) => {
  const handleOnClick = () => {
    onClick?.();
  };

  return (
    <button
      className={`button button-${color} ${className}`}
      onClick={handleOnClick}
      {...props}
    >
      {name}
    </button>
  );
};
