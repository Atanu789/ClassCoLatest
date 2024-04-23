// StudentIdContext.js
import React, { createContext, useState } from 'react';

const StudentIdContext = createContext();

export const StudentIdProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);

  const updateStudentId = (id) => {
    setStudentId(id);
  };

  return (
    <StudentIdContext.Provider value={{ studentId, updateStudentId }}>
      {children}
    </StudentIdContext.Provider>
  );
};

export const useStudentId = () => {
  return React.useContext(StudentIdContext);
};
