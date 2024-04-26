import { useState, useEffect } from 'react';
import Header from '../StudentDashboard/Header';


function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    background: '#053436',
    color: '#fff',
    borderRadius: '6px',
    padding: '10px', // Reduced padding

    marginLeft: "15%",
    marginRight: "15%",

    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    transition: 'all 0.3s ease',
  };

  const cardHoverStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.8) 0px 2px 20px, rgba(0, 0, 0, 0.6) 0px 15px 15px -7px, rgba(0, 0, 0, 0.4) 0px -3px 0px inset',
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/students/getAssignments')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setAssignments(data.data);
        } else {
          console.error('API response is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching assignments:', error));
  }, []);

  return (
    <>
    <Header/>
      <div className='bg-[#2124444f] h-screen text-white'>
        <div className="grid grid-cols-1 ">
          <div className='w-full flex justify-center '><h1 className='mt-10 text-3xl uppercase font-bold'>Assignments Section</h1></div>


          <div className="">
            <div className="grid grid-cols-1 gap-4">
              <div className='flex justify-center text-2xl uppercase mt-10 font-bold'>Topic</div>
              {assignments.map((assignment) => (
                <div key={assignment._id} className={`mx-5 text-wrap font-bold text-xl p-2 rounded-lg shadow-md ${isHovered ? 'bg-gray-900' : 'bg-gray-800'}`} style={{ ...cardStyle, ...(isHovered && cardHoverStyle), color: '#bdc6c7' }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}>
                  Assignment : {assignment.title}
                  <div className="grid grid-cols-3 grid-rows-1 gap-3">
                    <div>Instruction:</div>
                    <div>{assignment.description}</div>
                  </div>
                  Deadline: {assignment.deadline}
                  <div>


                    <div className={`flex flex-wrap justify-center gap-5 px-3 py-2 rounded-lg shadow-md `}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>
                      <input type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs bg-slate-600 rounded-lg ml-11" />
                      <button className="outline-none px-3 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "#068694" }}>Submit Document</button>
                    </div>

                    {/* For Video Submission */}
                    <div>
                      <div className={`flex  justify-center gap-5 px-3 py-2 rounded-lg shadow-md `}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <input type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs bg-slate-600 rounded-lg" />
                        <button className="outline-none px-3 py-1 rounded-full text-white shadow-lg" style={{ backgroundColor: "#068694" }}>Submit Video</button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Assignments;
