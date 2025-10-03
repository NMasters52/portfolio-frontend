import { useState } from "react";
//types
import type { Route } from "./+types/index";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
//components
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";
//framer-motion
import { AnimatePresence, motion } from "framer-motion";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );
  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects: Project[] = json.data.map((item: any) => {
    const imageUrl =
      item.image?.formats?.medium?.url || item.image?.url || null;

    return {
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      image: imageUrl ? `${imageUrl}` : "/images/no-image.png",
      url: item.url,
      date: item.date,
      category: item.category,
      featured: item.featured,
    };
  });

  return { projects };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerAPage = 10;

  //grab data from loader
  const { projects } = loaderData as { projects: Project[] };

  //filtered projects by category
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  //pagination logic
  const totalPages = Math.ceil(filteredProjects.length) / projectsPerAPage;
  const indexOfLast = currentPage * projectsPerAPage;
  const indexOfFirst = indexOfLast - projectsPerAPage;

  const projectsToRender = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <section className="text-3xl font-bold text-white mb-8">
      <h2 className="mb-5 font-bold text-3xl">Projects 🚀</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {projectsToRender.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default ProjectsPage;
