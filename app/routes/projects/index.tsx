import type { Route } from "./+types/index"
import type { Project } from "~/types"

export async function loader( {request}: Route.LoaderArgs ): Promise<{projects: Project[]}> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();

  return {projects: data};
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {

  const { projects } = loaderData as {projects: Project[]};
  console.log(projects);

  return (
    <section className="text-3xl font-bold text-white mb-8">
        <h2>
            🚀 Projects
        </h2>
    </section>
  )
}

export default ProjectsPage