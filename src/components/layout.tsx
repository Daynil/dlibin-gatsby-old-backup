import { important } from 'csx';
import { Link, PageRendererProps } from 'gatsby';
import React, { ReactNode } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { classes, media, style } from 'typestyle';
import logoDark from '../assets/dl-dark.png';
import logoLight from '../assets/dl-light.png';
import { useLocalStorage } from '../utils/hooks';
import { Media, Theme, Themes } from '../utils/theme';

const navWrap = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '94px'
});

const navLink = style({
  boxShadow: 'none',
  textDecoration: 'none',
  color: 'inherit'
});

const navText = (theme: Theme) =>
  style({
    color: important(theme.font),
    margin: '0 15px',
    borderBottom: '2px solid transparent',
    transition: 'border-color 0.1s ease-in',
    $nest: {
      '&:hover': {
        borderBottomColor: theme.primary
      }
    }
  });

const siteWrap = (theme: Theme) =>
  style({
    width: '100%',
    minHeight: '100vh',
    backgroundColor: theme.background
  });

const contentWrap = (theme: Theme) =>
  style(
    {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '100%',
      $nest: {
        '*': {
          color: theme.font
        },
        a: {
          color: theme.primary,
          textDecoration: 'none',
          transition: '0.1s ease-in',
          $nest: {
            '&:hover,&:active': {
              color: theme.font
            }
          }
        }
      }
    },
    media(Media.lg, { maxWidth: '60%' }),
    media(Media.xl, { maxWidth: '45%' })
  );

const themeSwitcher = style({
  position: 'absolute',
  right: '20px',
  top: '20px'
});

interface Props extends PageRendererProps {
  title: string;
  children: ReactNode;
}

const Layout = ({ location, title, children }: Props) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const navTextLink = classes(navLink, navText(Themes[theme]));

  let header = (
    <div className={navWrap}>
      <Link className={navLink} to={`/`}>
        <img
          style={{ marginBottom: 0 }}
          src={theme === 'light' ? logoLight : logoDark}
          alt="logo"
        />
      </Link>
      <div style={{ flex: '1 1 auto' }}></div>
      <Link className={navTextLink} to={'/'}>
        Blog
      </Link>
      <Link className={navTextLink} to={'/'}>
        Projects
      </Link>
      <Link className={navTextLink} to={'/'}>
        About
      </Link>
      <Link className={navTextLink} to={'/'}>
        Contact
      </Link>
      <span
        className={themeSwitcher}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <FaMoon size="40px" /> : <FaSun size="40px" />}
      </span>
    </div>
  );

  return (
    <div className={siteWrap(Themes[theme])}>
      <div className={contentWrap(Themes[theme])}>
        <header>{header}</header>
        <main style={{ marginTop: '48px' }}>{children}</main>
        <footer>
          © Danny Libin {new Date().getFullYear()}. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
