import React from "react";
import { useNavigate, userNavigate, Link} from 'react-router'


const Register = () => {

    const navigate = useNavigate()

    const handleSumit = (e) => {
        e.preventdefault()
    }


    return (
        <main>
            <div className="from-container">
                <h1>Register</h1>

                <form>
                    <div className="input-group">
                        <label htmlFor="Username">Username</label>
                        <input type="Text" id="Username" name="Username" placeholder="Enter Username" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter Email Address" />
                    </div>

                   <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>

                    <button className="button primary-button" >Register</button>

                </form>

                <p>Already have an account? <link to={"/login"}>Login</link> </p>
            </div>
        </main>
    )
}

export default Register