import { button } from '@assets/theme/components/button';
import { card } from '@assets/theme/components/card';
import { drawer } from '@assets/theme/components/drawer';
import { progress } from '@assets/theme/components/progress';
import { Theme, ThemeOptions } from '@mui/material/styles';
import lodashMerge from 'lodash/merge';

export const componentsOverrides = (theme: Theme): Theme['components'] => {
  const components = lodashMerge(
    button(theme),
    card(theme),
    drawer(theme),
    progress(theme),
  );

  return components;
};
