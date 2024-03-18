import { ThemeColorSchema } from '@assets/theme/vars/types';
import { TypographyProps } from '@components/typography/mui-typography/types';
import { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
import { Merge } from 'type-fest';

export type LinearProgressOwnerStateType = {
  color: ThemeColorSchema;
  value: number;
  variant: 'contained' | 'gradient';
};

export type LinearProgressProps = Merge<MuiLinearProgressProps, {
  variant?: LinearProgressOwnerStateType['variant'];
  color?: LinearProgressOwnerStateType['color'];
  value: number;
  label?: boolean;
  labelColor?: TypographyProps['color'];
  labelText?: string;
}>;
