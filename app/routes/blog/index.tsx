import { useState } from "react";
//types
import type { Route } from "./+types"
import type { PostMeta } from "~/types";
//components
import PostsFilter from "~/components/PostsFilter";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";


export async function loader({request}: Route.LoaderArgs):Promise<{posts: PostMeta[]}> {
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  data.sort((a: PostMeta,b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime(); 
  })

  return {posts: data};
}

const BlogPage = ({loaderData}: Route.ComponentProps) => {
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  //posts data
  const {posts} = loaderData;
  //filtering state
  const [searchQuery, setSearchQuery] = useState('');

  //search query filtering
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLocaleLowerCase();
    const title = post.title.toLowerCase();
    const excerpt = post.excerpt.toLowerCase();
    return title.includes(query) || excerpt.includes(query);
  })

  //pagination logic
  const totalPages = Math.ceil(filteredPosts.length/postsPerPage);
  const lastIndex = postsPerPage * currentPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(firstIndex, lastIndex);

  

  return (
    <div className='mx-auto max-w-3xl mt-10 px-6 py-6 bg-gray-900'>
        <h2 className='text-3xl text-white font-bold mb-8'>📝 Blog</h2>

        <PostsFilter 
          searchQuery={searchQuery} 
          onQueryChange={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }} 
        />

        <div className='space-y-8'>
          {currentPosts.length === 0 
            ? (<p>No posts found...</p>)
            : (currentPosts.map((post) => (<PostCard key={post.slug} post={post} />)))
          }
        </div>
        

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
    </div>
  )
}

export default BlogPage