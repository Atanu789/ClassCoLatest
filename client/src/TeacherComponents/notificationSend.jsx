import React, { useState, useEffect } from 'react';

function Notification() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [studentEmails, setStudentEmails] = useState([]);

    useEffect(() => {
        fetchStudentEmails();
    }, []);

    const fetchStudentEmails = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/teachers/getStudents');
            const data = await res.json();
            if (data.success) {
                setStudentEmails(data.data || []);
            } else {
                console.error('Failed to fetch student emails:', data.message);
            }
        } catch (error) {
            console.error('Failed to fetch student emails:', error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        const userName = studentEmails.find(student => student._id === id)?.email;
        if (checked) {
            setSelectedParticipants(prevState => [...prevState, userName]);
        } else {
            setSelectedParticipants(prevState => prevState.filter(item => item !== userName));
        }
    };

    const handleSendNotifications = async (notificationType) => {
        let dataSend = {
            email: selectedParticipants,
        };

        let endpoint = notificationType === 'assignment' ? 'sendAssignEmail' : 'sendQuizEmail';

        try {
            const res = await fetch(`http://localhost:8000/api/v1/teachers/${endpoint}`, {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                alert('Notifications sent successfully!');
            } else {
                console.error('Failed to send notifications:', res.statusText);
            }
        } catch (error) {
            console.error('Failed to send notifications:', error);
        }
    };

    return (
        <>
            <div className="relative pl-20 inline-block">
                <button
                    id="dropdownSearchButton"
                    data-dropdown-toggle="dropdownSearch"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={toggleDropdown} // Toggle dropdown when the button is clicked
                >
                    Dropdown search{' '}
                    <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>

                {/* Dropdown menu */}
                <div
                    id="dropdownSearch"
                    className={`${isDropdownOpen ? 'block' : 'hidden'
                        } absolute right-0 mt-2 z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700`}
                >
                    <div className="p-3">
                        <label htmlFor="input-group-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="input-group-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search user"
                            />
                        </div>
                    </div>
                    {/* List items */}
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                        {studentEmails.map((student) => (
                            <li key={student._id}>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        id={student._id}
                                        type="checkbox"
                                        value=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        onChange={handleCheckboxChange}
                                    />
                                    <label
                                        htmlFor={student._id}
                                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                    >
                                        {student.email}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => handleSendNotifications('assignment')}
                        className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
                    >
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                        </svg>
                        Send Assignment Notifications
                    </button>
                    <button
                        onClick={() => handleSendNotifications('quiz')}
                        className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
                    >
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                        </svg>
                        Send Quiz Notifications
                    </button>
                </div>
            </div>
            {/* Separate box to display selected participants */}
            <div className="mr-96 mt-96">
                <h3 className="text-lg font-semibold">Selected Participants</h3>
                <ul>
                    {selectedParticipants.map((participant, index) => (
                        <li key={index}>{participant}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Notification;
