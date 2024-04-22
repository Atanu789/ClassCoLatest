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
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from "recharts";
import Todo from "../components/Todo/Todo";

function Home() {
  const [assignments, setAssignments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState("");
  const [notes, setNotes] = useState([]);
  const [noNotes, setNoNotes] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/students/getAssignments")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setAssignments(data.data);
          setIsLoaded(true); // Set isLoaded to true when data is fetched
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  useEffect(() => {
    const User = localStorage.getItem("studentName");
    if (User) {
      const user = User.replace(/"/g, "");
      console.log(user);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const notesString = localStorage.getItem("notes");
    if (notesString) {
      const notesArray = JSON.parse(notesString);
      setNotes(notesArray);
      const totalProps = notesArray.reduce(
        (acc, obj) => acc + Object.keys(obj).length,
        0
      );
      console.log(totalProps);
      setNoNotes(totalProps / 3);
    }
  }, []);

  const divStyle = {
    height: "170px",
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
  const [isHovered5, setIsHovered5] = useState(false);
  const socreQuizz = localStorage.getItem("quizPercentage")

  const data = [
    { name: "Attendance", Performance: 50 },
    { name: "Quiz", Performance: parseFloat(socreQuizz) },
    { name: "Assignment", Performance: 69 },
    { name: "ExtraCurricular", Performance: 30 },
    { name: "Grade", Performance: 50 },
  ];

  const pieChartData = [
    { name: "Attendance", value: 30 },
    { name: "Quiz", value: parseFloat(socreQuizz)},
    { name: "Assignment", value: 47 },
    { name: "ExtraCurricular", value: 30 },
    { name: "Grade", value: 30 },
  ];

  return (
    <main
      className={`main-container dark-theme ${isLoaded ? "fade-in" : ""}`}
      style={{ backgroundColor: "#0605333e" }}
    >
      {/* Main title */}
      <div className="main-title dark-bg">
        <h2 className="text-2xl font-bold">
          Hi there {user} Welcome to ClassConnect
        </h2>
      </div>

      {/* Main cards */}
      <div className="main-cards display-flex" style={{ gap: "65px" }}>
        {/* Card 1 */}
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
            <h2>Total Trophy Earned</h2>
          </div>
        </div>

        {/* Card 2 */}
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
            <h2>Total Badges Earned</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="card bg-blue-300 dark-card shadow-lg"
          style={{ ...cardStyle, ...(isHovered3 && cardHoverStyle) }}
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center shadow-lg"
            style={{ ...cardStyle, background: "#2c2c2c", color: "" }}
          >
            <FaNoteSticky className="text-4xl ml-auto text-green-500" />
            <h2 className="text-3xl font-bold">{noNotes}</h2>
            <h2>Public/Private Notes</h2>
          </div>
        </div>

        {/* Card 4 */}
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
            <h2>Assignment Score</h2>
          </div>
        </div>
      </div>



      <div className="line-chart-calendar-container mt-8 " style={{ display: "flex", justifyContent: "space-between" }}>
      <ResponsiveContainer width="50%" height="60%" style={{ marginRight: "10px", marginTop: "10px" }}>
  <div style={{ width: "100%", height: "300px" }}>
    <LineChart
      width={700}
      height={310}
      data={data}
      margin={{
        top: 15,
        right: 0,
        left: 18,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#ffffff" /> 
      <YAxis stroke="#ffffff" /> 
      <Tooltip contentStyle={{ color: '#ffffff' }} /> 
      <Legend iconType="circle" iconSize={10} wrapperStyle={{ color: '#ffffff' }} /> 
      <Line
        type="linear"
        dataKey="Performance"
        stroke="grey"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </div>
</ResponsiveContainer>


<ResponsiveContainer width="50%" height="60%" style={{ marginLeft: "300px", marginTop: "-62px" }}>
  <div style={{ width: "100%", height: "300px" }}>
    <PieChart width={400} height={400}>
      <Pie
        data={pieChartData}
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={`rgba(${index * 17}, ${index * 130}, ${index * 140}, 0.2)`} data/>
        ))}
      </Pie>
      <Tooltip contentStyle={{ color: '#ffffff' }} fill="white" />
    </PieChart>
  </div>
</ResponsiveContainer>




</div>


      <div
        className="bg-[#248dad1f] rounded-xl dark-card shadow-xl p-4 pt-6 mt-6 pl-14 pr-14 "
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        }}
        hoverStyle={{
          boxShadow:
            "rgba(0, 0, 0, 0.8) 0px 2px 20px, rgba(0, 0, 0, 0.6) 0px 15px 15px -7px, rgba(0, 0, 0, 0.4) 0px -3px 0px inset",
        }}
      >
        <h1 className="text-center text-3xl font-bold text-white pb-7">
          Upcoming Class
        </h1>

        <table className="w-full text-white border-collapse rounded-xl border border-gray-400">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Subject</th>
              <th className="p-2 border border-gray-400">Teachers Name</th>
              <th className="p-2 border border-gray-400">Date</th>
              <th className="p-2 border border-gray-400">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-600">English</td>
              <td className="p-2 border border-gray-600">RAMCHARAN ROY</td>
              <td className="p-2 border border-gray-600">30.03.2024</td>
              <td className="p-2 border border-gray-600">10.30 AM</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-600">Mathematics</td>
              <td className="p-2 border border-gray-600">AJIT SAHA</td>
              <td className="p-2 border border-gray-600">30.05.2024</td>
              <td className="p-2 border border-gray-600">11.30 AM</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className="bg-[#286f6f56] rounded-xl dark-card shadow-xl p-4 pt-6 mt-6 pl-14 pr-14"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        }}
        hoverStyle={{
          boxShadow:
            "rgba(0, 0, 0, 0.8) 0px 2px 20px, rgba(0, 0, 0, 0.6) 0px 15px 15px -7px, rgba(0, 0, 0, 0.4) 0px -3px 0px inset",
        }}
      >
        <h1 className="text-center text-3xl font-bold text-white pb-7">
          Pending Assignments
        </h1>

        <table className="w-full text-white border-collapse rounded-xl border border-gray-400">
          <thead>
            <tr>
              <th className="p-2 border border-gray-400">Subject</th>
              <th className="p-2 border border-gray-400">Teachers Name</th>
              <th className="p-2 border border-gray-400">Deadline</th>
              <th className="p-2 border border-gray-400">Status</th>
              <th className="p-2 border border-gray-400">Priority</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-900">
                <td className="p-2 border border-gray-600">
                  {assignment.subject}
                </td>
                <td className="p-2 border border-gray-600">
                  {assignment.teacherName}
                </td>
                <td className="p-2 border border-gray-600">{assignment.deadline}</td>
                <td className="p-2 border border-gray-600">Pending</td>
                <td className="p-2 border border-gray-600">High</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Home;
