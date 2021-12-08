import React from "react";
import TagCard from "./Content/TagCard";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
const Tags = () => {
    const location = useLocation();
    const option = location.state.option;
    const user = JSON.parse(localStorage.getItem("profile"));
    let contents = useSelector((state) => state.contents);
    if (option === "review" || option === "test")
        contents = contents.filter(
            (content) =>
                user?.result?.googleId === content.creator ||
                user?.result?._id === content.creator
        );

    const uniqTags = [...new Set(contents.map((content) => content.tag))];
    console.log(contents);
    return (
        <div>
            <div className="mt-12 ml-20 grid sm:grid-cols-1 md:grid-cols-4 ">
                {uniqTags.map((tag) => (
                    <div class="col-3 d-flex justify-content-center p-5 text-center ">
                        <TagCard tag={tag} option={option} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tags;
