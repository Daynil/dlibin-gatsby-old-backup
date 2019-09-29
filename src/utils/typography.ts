import Typography from 'typography';
import altonTheme from 'typography-theme-alton';
import { Colors } from '../theme';

altonTheme.headerFontFamily = ['Ubuntu', 'sans-serif'];
altonTheme.bodyColor = Colors.black.toString();
altonTheme.overrideStyles = ({ rhythm }, options, styles) => ({
  a: {
    color: Colors.primary.toString(),
    textDecoration: 'none',
    transition: '0.1s ease-in'
  },
  'a:hover,a:active': {
    color: options.bodyColor
  }
});

delete altonTheme.googleFonts;

const typography = new Typography(altonTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export const { scale, rhythm } = typography;
export default typography;
