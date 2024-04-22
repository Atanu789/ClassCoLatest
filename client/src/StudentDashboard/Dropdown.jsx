import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import CalendarApp from '../components/Calender'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
   

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-#115cd4 px-3 py-2  text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-#115cd4 hover:bg-gray-800 ml-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          Calendar
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
        <Menu.Items className="absolute left-0 z-10 mt-6">
          <div className="py-1">
            <Menu.Item>
              <CalendarApp />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
