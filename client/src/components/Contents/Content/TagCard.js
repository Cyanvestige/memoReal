import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Typography } from "@mui/material";

const TagCard = ({ tag, option }) => {
    const contents = useSelector((state) => state.contents);
    const numberOfPosts = contents.filter(
        (content) => content.tag === tag
    ).length;
    console.log(option);
    return (
        <div>
            <Link
                to={
                    option === "test"
                        ? {
                              pathname: `/test`,
                              state: { tag: tag },
                          }
                        : {
                              pathname: `/tags/${tag}`,
                              state: { tag: tag },
                          }
                }
                className="card text-dark bg-light mb-3"
                style={{ maxWidth: "18rem", textDecoration: "none" }}
            >
                <Card
                    className="h-40 w-36 flex flex-col justify-center items-center hover:shadow-xl"
                    variant="outlined"
                >
                    <Typography class="text-xl font-extrabold m-0">
                        {tag}
                    </Typography>
                    <Typography class="text-xl m-0">
                        {numberOfPosts}
                        {`${numberOfPosts == 1 ? ` post` : ` posts`}`}
                    </Typography>
                </Card>
            </Link>
        </div>
    );
};

export default TagCard;
