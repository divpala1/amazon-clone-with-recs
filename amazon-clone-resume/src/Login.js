import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();

        // Firebase login functionality.
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => alert(error.message))

    }

    const register = e => {
        e.preventDefault();

        // Firebase REGISTER functionality.

        // Everything after 'auth' with '.', is connected to the 'auth' though in a new line.
        auth
            .createUserWithEmailAndPassword(email, password)
            // If the user creation was successful and everything went smoothly, then it will return an auth-object.
            .then((auth) => {
                // Successfully created a new user with the email and password.
                if (auth) {
                    navigate('/')
                }
            })
            // If an error occurs, we display the error message to screen.
            .catch(error => alert(error.message));
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='login__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt="login__logo"
                />
            </Link>

            <div className="login__container">
                <h1>Sign-In</h1>
                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button 
                        type='submit' 
                        className='login__signInButton'
                        onClick={signIn}
                        >Sign-In</button>
                </form>

                <p>
                    By continuing, you agree to Amazon's <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940">Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ">Privacy Notice</a>.
                </p>
                <button className="login__registerButton" onClick={register}>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login