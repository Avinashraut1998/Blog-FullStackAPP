import { Outlet } from 'react-router'
import './App.css'
import Nav from './pages/landingPage/Nav'

function App() {


  return (
    <>
     <Nav />
     <Outlet />
    </>
  )
}

export default App
