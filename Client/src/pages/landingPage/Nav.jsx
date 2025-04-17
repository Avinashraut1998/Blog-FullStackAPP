import { Link } from "react-router"

const Nav = () => {
  return (
    <>
    <div className="flex justify-between p-10 border-2">
        <div className="logo">Logo</div>
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
        </div>
    </div>
    </>
  )
}
export default Nav