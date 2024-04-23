import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';
import Cookies from 'js-cookie';


import axios from "axios";

function Login() {
    
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [email, setEmail] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, email]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(
    //             `http://localhost:8000/api/v1/students/login`,
    //             {
    //                 username: user,
    //                 password: pwd,
    //                 email: email
    //             }
    //         );

    //         console.log(response.data);
    //         const accessToken = response.data.accessToken;

    //         setAuth({ user, pwd, email, accessToken });
    //         setUser('');
    //         setPwd('');
    //         setEmail('');
    //         setSuccess(true);
        
    //     } catch (err) {
    //         console.error(err.response.data);
    //         if (!err.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response.status === 400) {
    //             setErrMsg('Missing Username, Password, or Email');
    //         } else if (err.response.status === 401) {
    //             setErrMsg('Unauthorized');
    //         } else {
    //             setErrMsg('Login Failed');
    //         }
    //         errRef.current.focus();
    //     }
    // };
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
            const { data } = response;
      const { _id } = data.data;
            localStorage.setItem("studentId", JSON.stringify(_id));
    
            console.log(response.data);
            const accessToken = response.data.statusCode.accessToken;
            const refreshToken=response.data.statusCode.refreshToken    
            // Store access token in cookie
            Cookies.set('accessToken', accessToken, { expires: 2});
            // Store refresh token in cookie
            Cookies.set('refreshToken', refreshToken, { expires: 2});
             // Expires in 1 day
    
            setAuth({ user, pwd, email, accessToken ,refreshToken});
            setUser('');
            setPwd('');
            setEmail('');
            setSuccess(true);
        
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
                    <p>
                        <a href="/Stud/${_id}">Go to Home</a>
                    </p>
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
                            <a href='/'>Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default Login;
