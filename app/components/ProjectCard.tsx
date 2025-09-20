import { Link } from "react-router";
import type { Project } from "~/types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      to={`/projects/${project.documentId}`}
      className="block transform transition duration-300 hover:scale-[1.02]"
    >
      <div className="bg-gray-800 border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-5">
          <h3 className="font-semibold text-blue-400 mb-1">{project.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{project.description}</p>
          <div className="flex justify between items-center text-sm text-gray-400">
            <span>{project.category}</span>
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
