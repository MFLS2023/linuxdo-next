import { ThemeColorSchema } from '@assets/theme/vars/types';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import React, { forwardRef, ReactNode } from 'react';

import ButtonRoot from './styles/root';
import type { ButtonProps } from './types';

const Button = forwardRef(
  (
    {
      color = 'white',
      variant = 'gradient',
      size = 'medium',
      circular = false,
      iconOnly = false,
      children,
      ...restProps
    }: ButtonProps,
    ref: ButtonProps['ref'],
  ) => {
    const getColor = (rawColor: ButtonProps['color']): MuiButtonProps['color'] => {
      const validColors: MuiButtonProps['color'][] = [
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
      ];
      return validColors.includes(rawColor as MuiButtonProps['color'])
        ? (rawColor as MuiButtonProps['color'])
        : 'primary';
    };

    return (
      <ButtonRoot
        {...restProps}
        ref={ref}
        color={getColor(color)}
        variant={variant === 'gradient' ? 'contained' : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly }}
      >
        {children}
      </ButtonRoot>
    );
  },
);

export default Button;
