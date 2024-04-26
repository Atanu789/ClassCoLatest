import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [_id, setId] = useState(''); // Define _id state
    const navigate = useNavigate();
    

    // useEffect(() => {

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, email]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v1/students/login`,
            {
                username: user,
                password: pwd,
                email: email
            }
        );

        console.log(response.data);
        
        const  accessToken= response.data.statusCode.accessToken;
        const  refreshToken= response.data.statusCode.refreshToken;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        const userId = response.data.statusCode.user._id; // Access _id from user object
        console.log("userId",userId)
        const fullName= response.data.statusCode.user.fullName;
        console.log("fullName",fullName)
        localStorage.setItem("studentName", JSON.stringify(fullName));
        const studentUsername= response.data.statusCode.user.username;
        console.log("studentUsername",studentUsername)
        localStorage.setItem("studentUsername", JSON.stringify(studentUsername));

        // Save userId to local storage
        localStorage.setItem("studentId", userId);
        

        // Store access token in cookie
        Cookies.set('accessToken', accessToken, { expires: 2 });
        // Store refresh token in cookie
        Cookies.set('refreshToken', refreshToken, { expires: 2 });

       
        setUser(''); 
        setPwd('');
        setEmail('');
        setSuccess(true);

        navigate(`/Stud/${userId}`); // Navigate to the specified path

    } catch (err) {
        console.error(err.response.data);
        if (!err.response) {
            setErrMsg('No Server Response');
        } else if (err.response.status === 401) {
            setErrMsg('Missing Username, Password, or Email');
        } else if (err.response.status === 400) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
};

    
    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                   
                </section>
            ) : (
                
                <section>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id="username"
                            placeholder='Enter your Username'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id="password"
                            placeholder='Enter your Password'
                            autoComplete='off'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />

                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id="email"
                            placeholder='Enter your Email'
                            autoComplete='off'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <button type="submit">Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className='line'>
                            <a href='/sign-up'>Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default Login;