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
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerAPage = 10;

  //grab data from loader
  const { projects } = loaderData;

  //filtered projects by category
  const categories = ['All', ...new Set(projects.map(project => project.category))]
  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter(project => project.category === selectedCategory)

  //pagination logic
  const totalPages = Math.ceil(filteredProjects.length) / projectsPerAPage;
  const indexOfLast = currentPage * projectsPerAPage;
  const indexOfFirst = indexOfLast - projectsPerAPage;

  const projectsToRender = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <section className="text-3xl font-bold text-white mb-8">
        <h2 className="mb-5 font-bold text-3xl">Projects 🚀</h2>
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