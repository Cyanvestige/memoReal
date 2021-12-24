import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card, CardContent, Typography } from "@mui/material";
import "./ContentList.css";
const ContentList = () => {
    const location = useLocation();
    // const contents = useSelector((state) => state.contents);
    const { tag } = location.state;
    const contents = useSelector((state) => state.contents);
    const [filteredContents, setFilteredContents] = useState([
        contents.filter((content) => content.tag === tag),
    ]);
    //very important, keeps updating the content list
    useEffect(
        () =>
            setFilteredContents(
                contents.filter((content) => content.tag === tag)
            ),
        [contents]
    );

    return (
        <div className="mt-12 w-10/12 flex items-center justify-center">
            <ul className="w-100">
                {filteredContents.map((content) => (
                    <Link
                        to={{
                            pathname: `${content.tag}/${content._id}`,
                            state: { id: content._id },
                        }}
                        className="shadow-sm  no-underline "
                    >
                        <div className="post">
                            <div className="flex flex-col justify-center items-center mt-2 p-3 text-black">
                                <h3>{content.title}</h3>
                                <div className="flex justify-evenly w-full">
                                    <h5
                                        variant="h5"
                                        className="mt-2 text-gray-500"
                                    >
                                        {`${
                                            content.name
                                                ? content.name
                                                : "Nameless"
                                        }`}
                                    </h5>
                                    <h5 className="mt-2 ml-4 text-gray-500">
                                        {`${new Date(
                                            content.createdAt
                                        ).getFullYear()}/${
                                            new Date(
                                                content.createdAt
                                            ).getMonth() + 1
                                        }/${new Date(
                                            content.createdAt
                                        ).getDate()}`}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ContentList;
