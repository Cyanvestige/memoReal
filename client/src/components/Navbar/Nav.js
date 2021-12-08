import React from "react";
import * as style from "./style";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrID } from "../../actions/contents";
const Nav = () => {
    const dispatch = useDispatch();
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            style={style.style.navbar}
        >
            <div className="container-fluid ">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/test" className="nav-link">
                                Test
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tags" className="nav-link">
                                Review
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/create"
                                className="nav-link"
                                onClick={() => dispatch(setCurrID(0))}
                            >
                                Create
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Nav;
