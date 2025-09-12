import { mark } from "framer-motion/client";
import type { Route } from "./+types/details"
import ReactMarkdown from 'react-markdown'
import { PostMeta } from "~/types"

export async function loader({request, params}: Route.LoaderArgs) {
    const { slug } = params;

    const url = new URL('/posts-meta.json', request.url);
    const res = await fetch(url.href);

    if(!res.ok) throw new Error('Failed to fetch data');

    const index = await res.json();

    const postMeta = index.find((post:PostMeta) => post.slug === slug);
    if (!postMeta) throw new Response('Not Found', {status: 404});

    // dynamicall import raw markdow
    const markdown = await import(`../../posts/${slug}.md?raw`);

    return {
        postMeta,
        markdown: markdown.default,
    };
}

type BlogPostDetailsPageProps = {
    loaderData: {
        postMeta: PostMeta,
        markdown: string
    }
}

const BlogPostDetailsPage = ({loaderData}: BlogPostDetailsPageProps) => {

    const {postMeta, markdown} = loaderData;

    console.log(postMeta, markdown)

  return (
    <div>details</div>
  )
}

export default BlogPostDetailsPage