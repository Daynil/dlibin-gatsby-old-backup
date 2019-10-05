import { graphql, Link, PageRendererProps } from 'gatsby';
import React from 'react';
import { style } from 'typestyle';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { BlogPostBySlugQuery, SitePageContext } from '../graphql-types';

const date = style({ position: 'relative', top: '-10px', fontSize: '16px' });

interface Props extends PageRendererProps {
  data: BlogPostBySlugQuery;
  pageContext: SitePageContext;
}

const BlogPostTemplate = ({ data, location, pageContext }: Props) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article style={{ marginBottom: '50px' }}>
        <header
          style={{
            marginBottom: '20px'
          }}
        >
          <h1>{post.frontmatter.title}</h1>
          <p className={date}>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <nav>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            marginLeft: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
