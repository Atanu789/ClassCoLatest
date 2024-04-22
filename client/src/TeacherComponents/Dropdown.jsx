import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import CalendarApp from '../components/Calender'
import { ImUser } from "react-icons/im";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
    const [userName,setUserName] = useState("")
  useEffect(()=>{
const UserName = localStorage.getItem("teacherUsername");
   if(UserName){
   const  username = UserName.replace(/"/g , "");
    console.log(username)
    setUserName(username)
   }
  },[])
  return (
    <Menu as="div" 
    className="relative inline-block text-left ">
    
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-#115cd4 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-#115cd4 hover:bg-gray-800  "
          onClick={() => setIsOpen(!isOpen)}
        >
         <ImUser  />Profile
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-transform ease-out duration-5000"
        enterFrom="opacity-0 translate-y-[-30%]"
        enterTo="opacity-100 translate-y-0"
        leave="transition-transform ease-in duration-5000"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[-30%]"
      >
        <Menu.Items className="absolute left-0 z-10 mt-3 ">
          <div className="py-1 bg-black rounded-lg  size-28 content-center flex justify-center ">
            {/* <Menu.Item>
              <CalendarApp />

            </Menu.Item> */}
            <div className='m-2'>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" className='rounded-full size-16 ml-2 '/>
           <h1 className='mt-2
          '>{userName}</h1>
           </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}