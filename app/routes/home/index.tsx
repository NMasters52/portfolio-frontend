//types
import type { Route } from "./+types/index";
import type { Project } from "~/types";
//components
import FeaturedProjects from "~/components/FeaturedProjects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfilio | Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({request}:Route.LoaderArgs):Promise<{projects: Project[]}> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();

  return {projects: data};
}


const HomePage = ({loaderData}: Route.ComponentProps)  => {

  const {projects} = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2}/>
    </>
  );
}

export default HomePage;