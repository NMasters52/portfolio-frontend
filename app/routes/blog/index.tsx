//types
import type { Route } from "./+types"
import type { PostMeta } from "~/types";
//components
import PostCard from "~/components/PostCard";


export async function loader({request}: Route.LoaderArgs):Promise<{posts: PostMeta[]}> {
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();
  return {posts: data};
}

const BlogPage = ({loaderData}: Route.ComponentProps) => {

  const {posts} = loaderData;
  console.log(posts);

  return (
    <div className='mx-auto max-w-3xl mt-10 px-6 py-6 bg-gray-900'>
        <h2 className='text-3xl text-white font-bold mb-8'>📝 Blog</h2>
        {posts.map((post) => (
         <PostCard key={post.slug} post={post} />
        ))}
    </div>
  )
}

export default BlogPage