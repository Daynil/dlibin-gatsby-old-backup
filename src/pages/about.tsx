import { important } from 'csx';
import { graphql, PageRendererProps } from 'gatsby';
import Image from 'gatsby-image';
import React, { useContext } from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { style } from 'typestyle';
import Layout from '../components/layout';
import { AboutQuery, SitePageContext } from '../graphql-types';
import { Theme, ThemeContext } from '../utils/theme';

const display = style({
  display: 'flex',
  alignItems: 'center'
});

const pic = style({
  display: important('block'),
  width: '180px',
  borderRadius: '7px',
  marginBottom: '0'
});

const socialList = (theme: Theme) =>
  style({
    width: '150px',
    fontSize: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    $nest: {
      'a > svg': {
        transition: '0.1s ease-in'
      },
      'a:hover > svg': {
        fill: theme.primary
      }
    }
  });

interface Props extends PageRendererProps {
  data: AboutQuery;
  pageContext: SitePageContext;
}

const About = ({ data, location, pageContext }: Props) => {
  const siteTitle = data.site.siteMetadata.title;
  const theme = useContext(ThemeContext);

  return (
    <Layout location={location} title={siteTitle}>
      <div className={display}>
        {/* <img src={aboutPic} alt="me" className={pic} /> */}
        <div style={{ width: '180px' }}>
          <Image
            //@ts-ignore
            fixed={data.avatar.childImageSharp.fixed}
            className={pic}
            alt="Danny Libin"
          />
        </div>
        <span style={{ marginLeft: '30px' }}>
          <p>
            I'm a pharmacist, exploring the world through code when I'm not
            slinging pills. I got into coding completely on a whim and ended up
            addicted. Coding is more than just a powerful tool. It's an
            adventure, a construct of your own imagination, and anything is
            possible. ⚔️🤠🛡️
          </p>
          <p>
            I specialize in full stack web development with
            Typescript/Javascript, React, Angular, and Node.js. I also dabble in
            process automation and data analysis with SQL, VBA, and Python.
          </p>
          <span className={socialList(theme)}>
            <a href="https://github.com/daynil" target="_blank">
              <FaGithub />
            </a>
            <a href="https://twitter.com/day1l" target="_blank">
              <FaTwitter />
            </a>
            <a href="mailto:dlibinrx@gmail.com" target="_blank">
              <MdMail />
            </a>
          </span>
        </span>
      </div>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query About {
    site {
      siteMetadata {
        title
      }
    }
    avatar: file(absolutePath: { regex: "/about-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 180) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
