import Container from '@/components/atoms/Container'
import RichText from '@/components/atoms/RichText'
import Layout from '@/components/common/Layout'
import Blocks from '@/components/molecules/Blocks'
import Archive from '@/components/organisms/Archive'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticPaths from '@/functions/wordpress/postTypes/getPostTypeStaticPaths'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'

// Define route post type.
const postType = 'page'

/**
 * Render the Page component.
 *
 * @author WebDevStudios
 * @param  {object}  props            The component attributes as props.
 * @param  {boolean} props.archive    Whether displaying single post (false) or archive (true).
 * @param  {object}  props.pagination Archive pagination data from WordPress.
 * @param  {object}  props.post       Post data from WordPress.
 * @param  {Array}   props.posts      Array of post data from WordPress.
 * @return {Element}                  The Page component.
 */
export default function Page({archive, pagination, post, posts}) {
  if (archive) {
    return (
      <Layout seo={{...post?.seo}}>
        <Container>
          <Archive posts={posts} postType="post" pagination={pagination} />
        </Container>
      </Layout>
    )
  }

  return (
    <Layout seo={{...post?.seo}}>
      <Container>
        <article className="innerWrap">
          <RichText tag="h1">{post?.title}</RichText>
          <Blocks blocks={post?.blocks} />
        </article>
      </Container>
    </Layout>
  )
}

/**
 * Get post static paths.
 *
 * @author WebDevStudios
 * @return {object} Object consisting of array of paths and fallback setting.
 */
export async function getStaticPaths() {
  return await getPostTypeStaticPaths(postType)
}

/**
 * Get post static props.
 *
 * @author WebDevStudios
 * @param  {object}  context             Context for current post.
 * @param  {object}  context.params      Route parameters for current post.
 * @param  {boolean} context.preview     Whether requesting preview of post.
 * @param  {object}  context.previewData Post preview data.
 * @return {object}                      Post props.
 */
export async function getStaticProps({params, preview, previewData}) {
  return getPostTypeStaticProps(params, postType, preview, previewData)
}

Page.propTypes = {
  ...getPagePropTypes(postType)
}
