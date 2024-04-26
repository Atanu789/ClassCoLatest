import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate(); // Use navigate hook

    const logout = async () => {
        try {
            // Make a request to logout endpoint
            const response = await axios.post(
                'http://localhost:8000/api/v1/students/logout',
                {},
                {
                    withCredentials: true, // Make sure to send credentials
                }
            );

            console.log(response.data);

            // Clear cookies

            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');

            // Redirect to login page after logout

            navigate('/login');

        } catch (error) {
            console.log('Logout unsuccessful:', error);


            // Handle unauthorized or other errors
            if (error.response && error.response.status === 401) {
                console.log('Unauthorized. Redirecting to login...');
                navigate('/login');
            }
        }
    };

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
                Logout
            </button>
        </div>
    );
}


export default Logout;
