import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@mui/material";
function HeaderOption({ avatar, Icon, title }) {
    return (
        <div className="headerOption  ">
            {Icon && <Icon className="headerOption__icon mb-0.5" />}
            {avatar && (
                <Avatar className="headerOption__icon" src={avatar}></Avatar>
            )}
            <h3 className="headerOption__title  no-underline">{title}</h3>
        </div>
    );
}

export default HeaderOption;
