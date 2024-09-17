import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/user.action";

const LoginPageForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(""); 

        try {
            const result = await dispatch(loginUser({ email, password }));

            if (loginUser.fulfilled.match(result)) {
                navigate("/programs");
            } else {
                setError("Incorrect Email/Password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-5">
                    <label htmlFor="email" className="text-primary-color font-semibold block mb-3">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-5/6 px-4 py-2 border border-gray-300 text-primary-color focus:outline-none focus:border-primary-color"
                    />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="password" className="text-primary-color font-semibold block mb-3 text-base">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-5/6 px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary-color"
                    />
                </div>
                <div className="w-4/6 mb-2">
                    <button
                        type="submit"
                        className="px-10 py-2 bg-secondary-color text-white hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </div>
                {/* <div className="w-5/6 text-right">
                    <a href="/forgot-password" className="text-primary-color font-bold hover:text-secondary-color text-base">
                        Forgot Password? Click Here!
                    </a>
                </div> */}
            </form>
            {error && (
                <p className="absolute top-full left-0 text-red-500 mt-2">
                    {error}
                </p>
            )}
        </div>
    );
};

export default LoginPageForm;
