import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index"
import type { Project } from "~/types"


export async function loader( {request}: Route.LoaderArgs ): Promise<{projects: Project[]}> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();

  return {projects: data};
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {

  const { projects } = loaderData;

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerAPage = 2;

  const totalPages = Math.ceil(projects.length) / projectsPerAPage;
  const indexOfLast = currentPage * projectsPerAPage;
  const indexOfFirst = indexOfLast - projectsPerAPage;

  const projectsToRender = projects.slice(indexOfFirst, indexOfLast);

  const renderPagination = Array.from({length: totalPages}, (_, idx) => (
    <button
      key={idx + 1}
      onClick={() => setCurrentPage(idx + 1)}
      className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === idx + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-200'
          }`}
    >
      {idx+1}
    </button>
  ))


  


  return (
    <section className="text-3xl font-bold text-white mb-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {projectsToRender.map((project) => (
            <ProjectCard key={project.id} project={project}/>
          ))}
        </div>
        <div className='flex justify-center gap-2 mt-8'>
          {totalPages > 0 && renderPagination}
        </div>
    </section>
  )
}

export default ProjectsPage