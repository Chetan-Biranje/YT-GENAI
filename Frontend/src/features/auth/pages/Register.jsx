import React from "react";


const Register = () => {
    return (
        <main>
            <div className="from-container">
                <h1>login</h1>

                <form>

                    <div className="input-group">
                        <label htmlFor="email"></label>
                        <input type="email" id="email" name="email" placeholder="Enter Email Address" />
                    </div>

                </form>
            </div>
        </main>
    )
}

export default Register