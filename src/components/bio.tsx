import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import { BioQuery } from '../graphql-types';

const Bio = () => {
  const data: BioQuery = useStaticQuery(graphql`
    query Bio {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: '10px'
      }}
    >
      <Image
        // @ts-ignore
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: '10px',
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`
        }}
        imgStyle={{
          borderRadius: `50%`
        }}
      />
      <p>
        Adventures in code. <br /> Written by <strong>{author}</strong>.
      </p>
    </div>
  );
};

export default Bio;
