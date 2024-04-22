import { FiAirplay } from "react-icons/fi";
import { FiBarChart2 } from "react-icons/fi";
import { CgPlayListCheck } from "react-icons/cg";

function QuizSection() {
  return (
    <a href="quiz" style={{ zIndex: 20 }}>
      <div className="bg-gray-900 rounded-t-lg p-5 flex justify-between items-center">
        <h1 className="text-white text-4xl">Quiz Section</h1>
      </div>
      <div className="bg-gray-800">
        <hr className="border-gray-700" />
      </div>
      <div className="bg-gray-900 text-white p-5">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <h1 className="text-3xl font-bold">Participate in a quiz or poll</h1>
            <p>Visualize student engagement and quiz results</p>
          </div>
          <h1 className="text-3xl font-bold mt-8">Quizzes & Polls Dashboard</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center">
              <FiAirplay className="text-5xl text-blue-500" />
              <h2 className="text-white text-3xl font-bold">50</h2>
              <p>Quizzes Participated</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center">
              <FiBarChart2 className="text-5xl text-yellow-500" />
              <h2 className="text-white text-3xl font-bold">500</h2>
              <p>Polls Attended</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center">
              <CgPlayListCheck className="text-5xl text-green-500" />
              <h2 className="text-white text-3xl font-bold">10</h2>
              <p>Statistics Generated</p>
            </div>
          </div>
        </div>
        <div className="mx-7 mt-12">
          <div className="bg-gray-800 rounded-3xl p-7">
            <h1 className="text-2xl font-bold">1. The metal whose salts are sensitive to light is?</h1>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-white">Zinc</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-white">Silver</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-white">Copper</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-white">Aluminum</label>
              </div>
            </div>
          </div>
        </div>
        {/* Add more questions here */}
        {/* Add more questions similarly */}
        <div className="mt-14 flex flex-wrap justify-center bottom-12 inset-x-0 px-10">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg px-3 py-2 rounded-3xl">
            {/* Add button or any other components here */}
          </div>
        </div>
      </div>
    </a>
  );
}

export default QuizSection;
