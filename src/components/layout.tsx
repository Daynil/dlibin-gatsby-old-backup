import { Link, PageRendererProps } from 'gatsby';
import React, { ReactNode } from 'react';
import { classes, media, style } from 'typestyle';
import logo from '../dl-blk2.png';
import { Colors, Media } from '../theme';

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

const navText = style({
  margin: '0 15px',
  borderBottom: '2px solid transparent',
  transition: 'border-color 0.1s ease-in',
  $nest: {
    '&:hover': {
      borderBottomColor: Colors.primary.toString()
    }
  }
});

const siteWrap = style(
  {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%'
  },
  media(Media.lg, { maxWidth: '60%' }),
  media(Media.xl, { maxWidth: '45%' })
);

const navTextLink = classes(navLink, navText);

interface Props extends PageRendererProps {
  title: string;
  children: ReactNode;
}

const Layout = ({ location, title, children }: Props) => {
  let header = (
    <div className={navWrap}>
      <Link className={navLink} to={`/`}>
        <img style={{ marginBottom: 0 }} src={logo} alt="logo" />
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
    </div>
  );

  return (
    <div className={siteWrap}>
      <header>{header}</header>
      <main style={{ marginTop: '48px' }}>{children}</main>
      <footer>
        © Danny Libin {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
