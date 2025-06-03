import { Link, NavLink, useNavigate } from "react-router"

const Nav = () => {
  
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-b shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <div onClick={handleClick} className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white">
          Logo
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 text-sm font-medium text-gray-700 dark:text-gray-200">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg ${
                isActive
                  ? "bg-amber-400 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              }`
            }
          >
            Home
          </NavLink>

          <Link
            to="/about"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            About
          </Link>

          <Link
            to="/gallery"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            Gallery
          </Link>

          <Link
            to="/article"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            Article
          </Link>

          <Link
            to="/contact"
            className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
    </>
  )
}
export default Nav