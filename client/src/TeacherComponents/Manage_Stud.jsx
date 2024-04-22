import { useState } from 'react';
import Header from './Header';
import { HiMiniArrowDownOnSquare } from "react-icons/hi2";
const ManageStud = () => {
   
    return (
        <>
        <Header/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#202020]" >
      
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
          Manage Students
        </h1>

        <table className="w-full text-white" >
          <thead>
            <tr className='border-gray-400'>
           
            <th className="p-2  flex gap-1" > <HiMiniArrowDownOnSquare className='size-5' />Select</th>
            </tr>
          </thead>
          <tbody>
            {/* {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-900">
                
               
              </tr>
            ))} */}
            <tr className='border border-gray-400 rounded-lg'>
            
                <td className="p-2 flex gap-3 ">
                <input type='checkbox'></input> Name
                </td>
                <td className="p-2">
               Class
                </td>
                <td className="p-2">User ID</td>
                <td className="p-2 flex justify-center ">Gmail</td>
            </tr>
            <tr className='border'>
            <td className="p-2 flex gap-3">
                <input type='checkbox'></input> Atanu Basak
                </td>
                <td className="p-2">
               ii
                </td>
                <td className="p-2">Balbichi</td>
                <td className="p-2">atanuholchod@gmail.com</td>
            </tr>
            <tr className='border'>
            <td className="p-2 flex gap-3">
                <input type='checkbox'></input> Atanu Basak
                </td>
                <td className="p-2">
               ii
                </td>
                <td className="p-2">Balbichi</td>
                <td className="p-2">atanuholchod@gmail.com</td>
            </tr>
            <tr className='border'>
            <td className="p-2 flex gap-3">
                <input type='checkbox'></input> Atanu Basak
                </td>
                <td className="p-2">
               ii
                </td>
                <td className="p-2">Balbichi</td>
                <td className="p-2">atanuholchod@gmail.com</td>
            </tr>
            <tr className='border'>
            <td className="p-2 flex gap-3">
                <input type='checkbox'></input> Atanu Basak
                </td>
                <td className="p-2">
               ii
                </td>
                <td className="p-2">Balbichi</td>
                <td className="p-2">atanuholchod@gmail.com</td>
            </tr>
            
          </tbody>
        </table>
      </div>
        </div>
        </>
    );
};

export default ManageStud;
