import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarApp() {
  const [date, setDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  // Function to check if a date is the current date
  const isCurrentDate = (dateToCheck) => {
    const currentDate = new Date();
    return (
      dateToCheck.getDate() === currentDate.getDate() &&
      dateToCheck.getMonth() === currentDate.getMonth() &&
      dateToCheck.getFullYear() === currentDate.getFullYear()
    );
  };

  // Function to return the class name for the tile
  const tileClassName = ({ date }) => {
    if (isCurrentDate(date)) return 'highlight-current-date';
    if (hoveredDate && date.toDateString() === hoveredDate.toDateString()) return 'highlight-hovered-date';
    return null;
  };

  return (
    <div className='app'>
       <div style={{ backgroundColor:'rgba(15, 107, 116, 1)' ,boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'}} className='rounded-lg p-5 flex flex-col justify-center items-center shadow-lg'>
        <Calendar
          onChange={setDate}
          onMouseOver={(e) => setHoveredDate(e.date)}
          value={date}
          calendarType='US'
          className='custom-calendar dark-theme bg-[#2a2a2a]' // Add dark-theme class
          tileClassName={tileClassName}
          style={{ width: '200px', height: '200px'  }} // Adjust size here
        />
        <p className='text-center mt-4 text-white'>
          Selected Date: {date.toDateString()}
        </p>
      </div>

      {/* CSS */}
      <style>
        {`
        .highlight-current-date {
            background-color: green !important;
            border-radius: 15%; 
          }


          .highlight-hovered-date {
            background-color: blue !important;
            border-radius: 15%; 
            
            
          }

          .dark-theme .react-calendar {
            background-color: #2a2a2a;
            color: white;
            border-radius: 4%; 
            
          }

          .dark-theme .react-calendar__navigation button {
            color: white;
            border-radius: 20%; 
          }

          .dark-theme .react-calendar__navigation button:enabled:hover,
          .dark-theme .react-calendar__navigation button:enabled:focus {
            background-color: #4f4f4f;
            border-radius: 15%; 
          }

          .dark-theme .react-calendar__tile--active {
            background-color: green !important;
            color: white;
            border-radius: 15%; 
          }

          .dark-theme .react-calendar__tile--now {
            background-color: #187273 !important;
          }

          .dark-theme .react-calendar__tile:hover {
            background-color: #4f4f4f !important;
            border-radius: 15%; 
          }
        `}
      </style>
    </div>
  );
}

export default CalendarApp;
