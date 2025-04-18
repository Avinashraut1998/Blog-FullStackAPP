import { Link, useNavigate } from "react-router"

const Nav = () => {
  
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
    <div className="flex justify-between p-10 border-2  font-mono  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div onClick={handleClick} className="cursor-pointer">Logo</div>
        <div className="flex gap-5 
        ">
            <Link to='/'>
            <div>Home</div>
            </Link>
            <Link to='/about'>
            <div>About</div>
            </Link>
            <Link to='/gallery'>
            <div>Gallery</div>
            </Link>
            <Link to='/article'>
            <div>Article</div>
            </Link>
            <Link to='/contact'>
            <div>Contact-Us</div>
            </Link>
        </div>
    </div>
    </>
  )
}
export default Nav