import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import ReviewIcon from "@mui/icons-material/MenuBook";
import ForumIcon from "@mui/icons-material/Forum";
import TestIcon from "@mui/icons-material/DesignServices";
import "./Header.css";
import decode from "jwt-decode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HeaderOption from "./HeaderOption";
import { Button, Avatar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
function Header() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history.push("/");
        setUser(null);
    };
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <div className="bg-gray-100 p-2 border-b-2 flex items-center justify-evenly">
            <div className="header__left">
                <h2>MemoReal</h2>
            </div>
            <div className="flex justify-center items-center ms-5">
                <div className="headeroptions mt-2 flex">
                    <Link to="/" className="no-underline">
                        <HeaderOption Icon={HomeIcon} title="Home" />
                    </Link>
                    <Link
                        to={{
                            pathname: `/tags`,
                            state: { option: "community" },
                        }}
                        className="no-underline"
                    >
                        <HeaderOption Icon={ForumIcon} title="Community" />
                    </Link>
                    {user && (
                        <div className="user-functions flex">
                            <Link to="/create" className="no-underline">
                                <HeaderOption
                                    Icon={CreateIcon}
                                    title="Create"
                                />
                            </Link>
                            <Link
                                to={{
                                    pathname: `/tags`,
                                    state: { option: "review" },
                                }}
                                className="no-underline"
                            >
                                <HeaderOption
                                    Icon={ReviewIcon}
                                    title="Review"
                                />
                            </Link>
                            <Link
                                to={{
                                    pathname: `/tags`,
                                    state: { option: "test" },
                                }}
                                className="no-underline"
                            >
                                <HeaderOption Icon={TestIcon} title="Test" />
                            </Link>
                        </div>
                    )}
                </div>
                {user ? (
                    <div className="flex pb-1 ms-4">
                        <h5 className="mr-4 mt-2">{`${user.result.name}`}</h5>
                        <Button variant="contained" onClick={logout}>
                            Log out
                        </Button>
                    </div>
                ) : (
                    <Link to="/auth" className="no-underline ms-2">
                        <Button
                            variant="contained"
                            color="primary"
                            className="h-10 hover:text-white-100"
                        >
                            {"Log In"}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
