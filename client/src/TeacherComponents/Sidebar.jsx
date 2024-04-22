import React, { useState } from 'react';
import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,BsX,
} from 'react-icons/bs';
import '../TeacherApp.css'; // Assuming you have a separate CSS file for teacher styling
import Example3 from './Drop';

function TeacherSidebar({ openSidebarToggle, OpenSidebar }) {
  const [isHovered, setIsHovered] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const sidebarStyle = {
    backgroundColor: isHovered ? '#0605333e' : '#0605333e',
    transform: sidebarHidden ? 'translateX(-100%)' : 'none',
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const toggleSidebarVisibility = () => {
    setSidebarHidden(!sidebarHidden);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""} style={sidebarStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <div className='sidebar-title flex bg-[#2826713e] '>
        <div className='sidebar-brand bg-[#06053300] rounded-full h-[70px] w-[70px] '>
          PROFILE
        </div>
        <div
          className="toggle-sidebar-btn"
          onClick={toggleSidebarVisibility}
          style={{ fontSize: '35px', cursor: 'pointer' }} // Adjust the font size as needed
        >
          <BsX />
        </div>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/Teach" className='flex'> {/* Updated href */}
            <BsGrid1X2Fill className='icon' />
            Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="teachquiz" className='flex'> {/* Updated href */}
            <BsFillGrid3X3GapFill className='icon' />
            Upload Quiz
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="uploadAssign" className='flex'> {/* Updated href */}
            <BsListCheck className='icon' />
            Upload Assignments
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="Manage" className='flex'> {/* Updated href */}
            <BsPeopleFill className='icon' />
            Manage Students
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="QRCodegenerator" className='flex'> {/* Updated href */}
            <BsMenuButtonWideFill className='icon' />
            Track Attendance
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="" className='flex'> {/* Updated href */}
            <BsFillGearFill className='icon' />
            Update Profile
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="http://localhost:8001/chat "  className='flex'>
            <BsPeopleFill className='icon' />
            Chat
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="" className='flex'> {/* Updated href */}
            <BsFillGearFill className='icon' />
            Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default TeacherSidebar;
