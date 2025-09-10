import { useState } from "react";
//types
import type { Route } from "./+types/index"
import type { Project } from "~/types"
//components 
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";


export async function loader( {request}: Route.LoaderArgs ): Promise<{projects: Project[]}> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();

  return {projects: data};
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {

  const { projects } = loaderData;

  //pagination logic and state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerAPage = 2;

  const totalPages = Math.ceil(projects.length) / projectsPerAPage;
  const indexOfLast = currentPage * projectsPerAPage;
  const indexOfFirst = indexOfLast - projectsPerAPage;

  const projectsToRender = projects.slice(indexOfFirst, indexOfLast);

  return (
    <section className="text-3xl font-bold text-white mb-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {projectsToRender.map((project) => (
            <ProjectCard key={project.id} project={project}/>
          ))}
        </div>
        
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

    </section>
  )
}

export default ProjectsPage