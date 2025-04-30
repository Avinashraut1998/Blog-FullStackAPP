import { Link } from "react-router"

const Login = () => {
  return (
    <div className=" flex justify-center p-5 m-5 font-mono  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-300 dark:border-gray-400">
      <form >
        <div className="">

        <input type="text" placeholder="Name" className="bg-amber-50 m-6 p-2 text-2xl border-amber-50 rounded-lg" />
        <br />
        <input type="email" placeholder="Email" className="bg-amber-50 m-6 p-2 text-2xl border-amber-50 rounded-lg" />
        <br />
        <input type="password" placeholder="Password" className="bg-amber-50 m-6 p-2 text-2xl border-amber-50 rounded-lg" />
        <br />
        <Link to='/admin-login/forgetpass'>
          <div>Forget Password</div>
        </Link>
        <br />
        <button type="submit" className="bg-amber-50 m-6 p-2 text-2xl border-amber-50 rounded-lg">Log-In</button>
        </div>
      </form>
    </div>
  )
}
export default Login