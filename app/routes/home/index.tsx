//types
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import type { PostMeta } from "~/types";
//components
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfilio | Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({request}:Route.LoaderArgs):Promise<{projects: Project[]; posts: PostMeta[]}> {
  const url = new URL(request.url);

  const [projRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url))
  ]);

  if(!projRes.ok || !postRes.ok) throw new Error('Failed to fetch projects or posts');

  const [projects, posts] = await Promise.all([
    projRes.json(),
    postRes.json()
  ])

  return {projects, posts};
}


const HomePage = ({loaderData}: Route.ComponentProps)  => {

  const {projects, posts} = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2}/>
      <AboutPreview />
      <LatestPosts posts={posts}/>
    </>
  );
}

export default HomePage;