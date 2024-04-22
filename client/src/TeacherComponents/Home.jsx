import React, { useEffect, useState } from "react";
import { FaNoteSticky } from "react-icons/fa6";
import { GiLevelFour } from "react-icons/gi";
import { BsFillTrophyFill } from "react-icons/bs";
import { CgPlayListCheck } from "react-icons/cg";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Calendar from "../components/Calender";

function Home() {
    const [user,setUser] = useState("")
   
  const data = [
    { name: "Attendance", Class9: 60 },
    { name: "Quiz", Class9: 30 },
    { name: "Assignment", Class9: 69 },
    { name: "ExtraCurricular", Class9: 40 },
    { name: "Quiz", Class9: 80 },
  ];
  
  useEffect(() => {
  const User = localStorage.getItem("teacherName");
   if(User){
   const  user = User.replace(/"/g , "");
    console.log(user)
    setUser(user)
   }

   
  
}, []);
  const divStyle = {
    height: '170px',
  };

  const cardStyle = {
    ...divStyle,
    background: "#12f8f12f",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    transition: "all 0.3s ease",
  };

  const cardHoverStyle = {
    // background: "#2f6f6f",
    borderRadius: "10px",
    boxShadow:
      "rgba(0, 255, 255, 0.4) 0px 2px 14px, rgba(0, 255, 255, 0.3) 0px 13px 13px -3px, rgba(0, 255, 255, 0.2) 0px -3px 0px inset",

    transform: "scale(1.09)",
  };

  // State to track hover state for each card
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);

  return (
    <main className="main-container dark-theme" style={{ backgroundColor: '#0605333e' }}>
      <div className="main-title dark-bg">
        <h2 className="text-2xl font-bold">
          Hi there, {user} Welcome to ClassConnect
        </h2>
      </div>

      <div className="main-cards display-flex" style={{ gap: "65px" }}>
        <div
          className="card bg-blue-300 dark-card shadow-lg"
          style={{ ...cardStyle, ...(isHovered1 && cardHoverStyle) }}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center shadow-lg"
            style={{ ...cardStyle, background: "#2c2c2c", color: "aqua" }}
          >
            <BsFillTrophyFill className="card_icon text-4xl ml-auto text-yellow-500" />
            <h2 className="text-3xl font-bold">56</h2>
            <h2>Students Notes Overview </h2>
          </div>
        </div>

        <div
          className="card bg-blue-300 dark-card shadow-lg"
          style={{ ...cardStyle, ...(isHovered2 && cardHoverStyle) }}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center shadow-lg"
            style={{ ...cardStyle, background: "#2c2c2c", color: "aqua" }}
          >
            <GiLevelFour className="card-icon text-4xl ml-auto text-blue-500" />
            <h2 className="text-3xl font-bold">3</h2>
            <h2>Preview Quiz </h2>
          </div>
        </div>

        <div
          className="card bg-blue-300 dark-card shadow-lg"
          style={{ ...cardStyle, ...(isHovered3 && cardHoverStyle) }}
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center shadow-lg"
            style={{ ...cardStyle, background: "#2c2c2c", color: "aqua" }}
          >
            <FaNoteSticky className="text-4xl ml-auto text-green-500" />
            <h2 className="text-3xl font-bold">36</h2>
            <h2>Pending Request </h2>
          </div>
        </div>

        <div
          className="card bg-blue-300 dark-card shadow-lg"
          style={{ ...cardStyle, ...(isHovered4 && cardHoverStyle) }}
          onMouseEnter={() => setIsHovered4(true)}
          onMouseLeave={() => setIsHovered4(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center shadow-lg"
            style={{ ...cardStyle, background: "#2c2c2c", color: "#fff" }}
          >
            <CgPlayListCheck className="text-5xl ml-auto text-blue-500" />
            <h2 className="text-3xl font-bold">36</h2>
            <h2>Grade Pending Assignment</h2>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", }}>
        <div
          className="flex justify-center items-center mt-10"
          style={{ marginRight: "auto", }}
        >
          <Calendar />
        </div>

        <ResponsiveContainer
          width="60%"
          height={300}
          style={{ margin: "50px" }}
        >
          <LineChart
            data={data}
            margin={{ top: 15, right: 0, left: -18, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Class9"
              stroke="grey"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
