import { useState } from 'react';
import Header from './StudentDashboard/Header';
import Sidebar from './StudentDashboard/Sidebar';
import Home from './StudentDashboard/Home';
import './StudentApp.css';
import { Outlet } from "react-router-dom";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
     <Header OpenSidebar={OpenSidebar}/>
      
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Outlet/>
      <Home />
      
    </div>
  )
}

export default App;