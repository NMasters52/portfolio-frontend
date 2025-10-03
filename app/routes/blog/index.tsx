import { useState } from "react";
//types
import type { Route } from "./+types";
import type { Post, StrapiResponse, StrapiPost } from "~/types";
//components
import PostsFilter from "~/components/PostsFilter";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import { SlGraduation } from "react-icons/sl";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  const json: StrapiResponse<StrapiPost> = await res.json();

  const posts = json.data.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  //posts data
  const { posts } = loaderData;
  //filtering state
  const [searchQuery, setSearchQuery] = useState("");

  //search query filtering
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLocaleLowerCase();
    const title = post.title.toLowerCase();
    const excerpt = post.excerpt.toLowerCase();
    return title.includes(query) || excerpt.includes(query);
  });

  //pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const lastIndex = postsPerPage * currentPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(firstIndex, lastIndex);

  return (
    <div className="mx-auto max-w-3xl mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl text-white font-bold mb-8">📝 Blog</h2>

      <PostsFilter
        searchQuery={searchQuery}
        onQueryChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p>No posts found...</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BlogPage;
