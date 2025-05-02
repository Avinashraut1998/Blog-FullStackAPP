import { useState } from "react"
import { Link } from "react-router"

const Login = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""

  })

  const handleData = (e) => {
    let { name, value } = e.target;
    setData((prevVal) => ({
      ...prevVal,
      [name]: value
    }))

  }

  const submitForm = (e) => {
    e.preventDefault();



    console.log(data);




  }

  return (
    <div className=" flex justify-center p-5 m-5 font-mono  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-300 dark:border-gray-400">
      <form onSubmit={submitForm} >
        <div className="">

          <input type="text" placeholder="Name" className="bg-amber-50 m-6 p-2 text-2xl border-amber-50 rounded-lg" name="name" value={data.name} onChange={handleData} />
          <br />
          <input type="email" placeholder="Email" className="bg-amber-50 m-6 p-2 text-2xl border-amber-50 rounded-lg" name="email" value={data.email} onChange={handleData} />
          <br />
          <input type="password" placeholder="Password" className="bg-amber-50 m-6 p-2 text-2xl border-amber-50 rounded-lg" name="password" value={data.password} onChange={handleData} />
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