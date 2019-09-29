import { hsl, hsla } from 'csx';

export const Colors = {
  black: hsla(0, 0, 0, 0.9),
  primary: hsl(177, 0.52, 0.46)
};

export const Media = {
  sm: { minWidth: '640px' },
  md: { minWidth: '768px' },
  lg: { minWidth: '1024px' },
  xl: { minWidth: '1280px' }
};
