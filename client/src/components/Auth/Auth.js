import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import loginLogo from "./login_logo.png";
import GoogleLogin from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { useHistory } from "react-router-dom";
import { signup, login } from "../../actions/auth";
import "./Auth.css";
const Auth = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const history = useHistory();
    const [passwordWrongError, setPasswordWrongError] = useState(false);
    const [userNotExistError, setUserNotExistError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isSignup, setIsSignUp] = useState(false);
    const handleShowPassword = () => setShowPassword((prev) => !prev);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history));
            // setErrorMessage(false);
        } else {
            const loginPromise = dispatch(login(formData, history));
            loginPromise.then((promise) => {
                if (promise?.response?.status === 400) {
                    setPasswordWrongError(true);
                    setUserNotExistError(false);
                } else if (promise?.response?.status === 404) {
                    setUserNotExistError(true);
                    setPasswordWrongError(false);
                }
            });
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();

    const switchMode = () => {
        setIsSignUp(!isSignup);
    };
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    };
    const googleFailure = () => {
        console.log("Failed");
    };
    return (
        <div className="login">
            <img src={loginLogo} />
            <form onSubmit={handleSubmit}>
                {isSignup && (
                    <input
                        placeholder="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                    />
                )}
                <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                {passwordWrongError && (
                    <p className="login-error">Password is wrong!</p>
                )}
                {userNotExistError && (
                    <p className="login-error">User Doesn't Exsit!</p>
                )}
                {isSignup && (
                    <input
                        placeholder="Confirm the password"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                    />
                )}

                <button className="button" type="submit">
                    {isSignup ? "Sign Up" : "Log In"}
                </button>
                {!isSignup && (
                    <GoogleLogin
                        clientId="904387753558-3jk0im9jdja4slp5cnd09ijdoh9khkun.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <div className="button">
                                <GoogleIcon className="mr-2" />
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    Log In
                                </button>
                            </div>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                )}
            </form>
            {isSignup ? (
                <p>
                    Already a member?
                    <span className="login__register" onClick={switchMode}>
                        Click here to log in
                    </span>
                </p>
            ) : (
                <p>
                    Not registered yet?
                    <span className="login__register" onClick={switchMode}>
                        Sign up Now!
                    </span>
                </p>
            )}
        </div>
    );
};

export default Auth;
