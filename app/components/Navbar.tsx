import { FaLaptopCode } from "react-icons/fa"
import { NavLink } from "react-router"

const Navbar = () => {
    
    const nonActiveLink = "transition hover:text-blue-400"
    const activeLink = "text-blue-400 font-semibold"

    const links = [
        {to: '/', name: 'Home'},
        {to: 'projects', name: 'Projects'},
        {to: 'blog', name: 'Blog'},
        {to: 'about', name: 'About'},
        {to: 'contact', name: 'Contact'},
    ]

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
            <NavLink to="/" className="flex items-center text-lg gap-2 font-bold text-blue-300">
                <FaLaptopCode className="text-xl text-blue-400"/>
                <span>Portfolio</span>
            </NavLink>

            {/* desktop nav */}
            <div className="hidden md:flex items-center gap-6">
                <div className="space-x-4 text-sm text-gray-300">
                    {links.map((link) => <NavLink key={link.to} to={link.to} className={({isActive}) => isActive ? activeLink : nonActiveLink}>{link.name}</NavLink>)}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar