import React from "react";
import "../auth.from.scss";

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <main>
            <div className="from-container">
                <h1>login</h1>

                <form>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter Email Address" />
                    </div>
                   <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>

                    <button className="button primary-button" >Login</button>

                </form>

                <p>Don't have an account? <link to={"/Register"}>Register</link> </p>
            </div>
        </main>
    )
}

export default Login