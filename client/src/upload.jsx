import { useState } from "react";
import axios from "axios";
import Input from "./components/Input";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import "./upload.css";
import { useStudentId } from "./context/StudentIdContext";

export default function Component() {
  const navigate = useNavigate();
  const { updateStudentId } = useStudentId(); // Using the context hook to access studentId

  const [studentFullname, setStudentFullname] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentUsername, setStudentUsername] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentInst, setStudentInst] = useState("");
  const [studentImg, setStudentImg] = useState(null);
  const [studentError, setStudentError] = useState("");

  const [teacherFullname, setTeacherFullname] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherUsername, setTeacherUsername] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherInst, setTeacherInst] = useState("");
  const [teacherImg, setTeacherImg] = useState(null);
  const [teacherError, setTeacherError] = useState("");

  const createStudent = async (event) => {
    event.preventDefault();
    setStudentError("");
    const formData = new FormData();
    formData.append('fullName', studentFullname);
    formData.append('email', studentEmail);
    formData.append('studentId', studentId);
    formData.append('username', studentUsername);
    formData.append('password', studentPassword);
    formData.append('instituteName', studentInst);
    formData.append('studentImg', studentImg);

    try {
      const res = await axios.post('http://localhost:8000/api/v1/students/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

        localStorage.setItem("studentEmail", JSON.stringify(studentEmail));

        navigate('/Login');

        console.log("Student registration successful", response.data);
      } catch (error) {
        console.error("Student registration error: ", error.response ? error.response.data : error);
        setStudentError("Failed to register student. Please try again.");
      }
    };
    const createTeacher = async (event) => {
      event.preventDefault();
      setTeacherError("");
      const formData = new FormData();
      formData.append('fullName', teacherFullname);
      formData.append('email', teacherEmail);
      formData.append('teacherId', teacherId);
      formData.append('username', teacherUsername);
      formData.append('password',  teacherPassword);
      formData.append('instituteName', teacherInst);
      formData.append('teacherImg', teacherImg);

      try {
        const res = await axios.post('http://localhost:8000/api/v1/teachers/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

        localStorage.setItem("teacherId", teacherId);
        localStorage.setItem("teacherName", teacherFullname);
        localStorage.setItem("teacherEmail", teacherEmail);
        localStorage.setItem("teacherUsername", teacherUsername);

        navigate('/Teach');
        console.log("Teacher registration successful", response.data);
      } catch (error) {
        console.error("Teacher registration error: ", error);
        setTeacherError("Failed to register teacher. Please try again.");
      }
    };

    return (
      <div className="min-h-screen bg-[#161616] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-[#313131] shadow-lg rounded-lg p-6 mt-16">
              <h2 className="text-2xl font-bold text-center mb-4">Student Sign Up</h2>
              {studentError && <p className="text-red-500 text-center">{studentError}</p>}
              <form onSubmit={createStudent} className="space-y-4">
                <Input
                  label="Name"
                  id="student-name"
                  placeholder="Enter your name"
                  value={studentFullname}
                  onChange={(e) => setStudentFullname(e.target.value)}
                  required
                />
                <Input
                  label="Email"
                  id="student-email"
                  placeholder="Enter your email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                  type="email"
                />
                <Input
                  label="Enrollment-Id"
                  id="student-id"
                  placeholder="Enter your Enrollment ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
                <Input
                  label="UserName"
                  placeholder="Enter your Unique UserName"
                  value={studentUsername}
                  onChange={(e) => setStudentUsername(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  placeholder="Create a Strong Password"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  required
                  type="password"
                />
                <Input
                  label="Institute Name"
                  placeholder="Enter your Institute's Name"
                  value={studentInst}
                  onChange={(e) => setStudentInst(e.target.value)}
                  required
                />
                <Input type="file"
                  label="Select Your Profile Picture"
                  placeholder="Uplode a Image"
                  name="studentImg"
                  onChange={(e) => setStudentImg(e.target.files[0])}

                />

                <div className="flex justify-center">
                  <Button type="submit" info="students" className="btn-dark">Create Account</Button>
                </div>
              </form>
            </div>
            <div className="bg-[#313131] shadow-lg rounded-lg p-6 mt-16">
              <h2 className="text-2xl font-bold text-center mb-4">Teacher Sign Up</h2>
              {teacherError && <p className="text-red-500 text-center">{teacherError}</p>}
              <form onSubmit={createTeacher} className="space-y-4">
                <Input
                  label="Name"
                  id="teacher-name"
                  placeholder="Enter your name"
                  value={teacherFullname}
                  onChange={(e) => setTeacherFullname(e.target.value)}
                  required
                />
                <Input
                  label="Email"
                  id="teacher-email"
                  placeholder="Enter your email"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  required
                  type="email"
                />
                <Input
                  label="Employee-Id"
                  id="teacher-id"
                  placeholder="Enter your Employee ID"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  required
                />
                <Input
                  label="UserName"
                  placeholder="Enter your Unique UserName"
                  value={teacherUsername}
                  onChange={(e) => setTeacherUsername(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  placeholder="Create a Strong Password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  required
                  type="password"
                />
                <Input
                  label="Institute Name"
                  placeholder="Enter your Institute's Name"
                  value={teacherInst}
                  onChange={(e) => setTeacherInst(e.target.value)}
                  required
                />
                <Input type="file"
                label="Select Your Profile Picture"
                placeholder="Uplode a Image"
                name="teacherImg"
                onChange={(e) => setTeacherImg(e.target.files[0])}

                />
                <div className="flex justify-center">
                  <Button type="submit" info="teachers" className="btn-dark">Create Account</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }