import { graphql, PageProps } from 'gatsby'
import * as React from 'react'
import BlogHeadLinks from '../components/blog/BlogHeadLinks'
import { PostsListPage } from '../components/blog/PostsListPage'
import { BLOG_TYPE_TO_INFO, BlogType } from '../components/blog/postTypes'

export const Page: React.FunctionComponent<PageProps<{ allMarkdownRemark: any }>> = props => (
    <PostsListPage
        blogInfo={BLOG_TYPE_TO_INFO[BlogType.Blog]}
        posts={props.data.allMarkdownRemark.edges.filter((post: any) => post.node.frontmatter.published === true)}
        location={props.location}
    >
        <div className="d-flex flex-column align-items-center">
            <BlogHeadLinks />
        </div>
    </PostsListPage>
)

export default Page

export const pageQuery = graphql`
    query BlogPosts {
        allMarkdownRemark(
            filter: { fields: { blogType: { in: ["blog", "podcast"] } } }
            sort: { fields: [frontmatter___publishDate], order: DESC }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        description
                        heroImage
                        author
                        authorUrl
                        canonical
                        tags
                        publishDate(formatString: "MMMM D, YYYY")
                        slug
                        published
                        changelogItems {
                            url
                            category
                            description
                        }
                        style
                    }
                    html
                    excerpt(pruneLength: 300)
                    fields {
                        slug
                        permalink
                        blogType
                    }
                    fileAbsolutePath
                }
            }
        }
    }
`
