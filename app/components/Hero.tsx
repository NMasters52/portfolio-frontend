import { Link } from "react-router"

const Hero = () => {
  return (
    <header className="text-center py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-colors duration-300">
        <h2 className="font-bold text-4xl mb-4">Hey, I'm Nick 👋</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            I build friendly web experiences and help others become confident, modern developers.
        </p>
        <div className="flex justify-center gap-4">
            <Link to="/projects" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                View Projects
            </Link>
            <Link to="/contact" className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-500 hover:text-white transition">
                Contact Me
            </Link>
        </div>
    </header>
  )
}

export default Hero
