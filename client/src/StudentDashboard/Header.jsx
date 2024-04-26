import React, { useEffect, useState } from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import TodoIcon from "../assets/todo.png";
import Calendar from "../components/Calender";
import Example from "./Dropdown";
import Example2 from "./Drop";
import Example1 from "./ProfileDropdown";
import "./Header.css";
import Logout from "../Logout";

function Header({ OpenSidebar }) {

    const storedStudentId  = localStorage.getItem("studentId");
  const Id = storedStudentId.replace(/"/g, "");

  return (
    <header className="header">
      <div className="grid grid-cols-6 grid-rows-1 gap-4 mr-20">
        <Example2 />
        <Example />
        <Logout/>
       

      </div>

      <div className="flex gap-2 justify-center items-center p-3">
        <div className="flex gap-5">
          <BsSearch className="icon mt-2" />
          <BsFillBellFill className="icon mt-2" />
          <a href={`/Stud/${Id}/todo`}>
            <img className="icon mt-[7px]" src={TodoIcon} alt="Todo Icon" />
          </a>
          <Example1 />
        </div>
      </div>
    </header>
  );
}

export default Header;
