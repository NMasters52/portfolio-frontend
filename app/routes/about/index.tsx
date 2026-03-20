import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "About | Nick Masters" }];
}

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
      {/* Intro */}
      <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
        <img
          src="/images/profile.jpg"
          alt="profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hey, I'm Nick 👋
          </h1>
          <p className="text-gray-300 text-lg">
            I'm a full-stack developer based in Jacksonville, FL — building
            purposeful apps and sharpening my craft every day. Before writing
            code, I spent years managing complex construction projects, and that
            systems-first mindset shapes how I approach every problem I sit down
            to solve. When I'm not at the computer, you'll find me out on the
            disc golf course or kayaking.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">My Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          To keep growing as a developer. Building apps that are faster,
          smarter, and more impactful than the last. I'm driven by solving real
          problems and creating experiences that actually matter to the people
          using them.
        </p>
      </div>

      {/* Tech Stack */}
      <h2 className="text-2xl font-semibold text-white mb-4">🚀 Tech I Use</h2>
      <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
        {[
          "JavaScript",
          "TypeScript",
          "React",
          "HTML5",
          "CSS3",
          "Git",
          "Linux",
          "MySQL",
          "Node.js",
          "PostgreSQL",
        ].map((tech) => (
          <li key={tech} className="bg-gray-700 px-3 py-1 rounded-md">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
