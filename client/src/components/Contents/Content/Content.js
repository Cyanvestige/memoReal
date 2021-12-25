import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
    deleteContent,
    setCurrID,
    getContents,
} from "../../../actions/contents";
const Content = () => {
    const inputStyle = {
        margin: "2em auto",
    };
    const location = useLocation();
    const dispatch = useDispatch();
    const contents = useSelector((state) => state.contents);
    const currID = location.state.id;

    const user = JSON.parse(localStorage.getItem("profile"));
    const [filteredContent, setfilteredContent] = useState(
        contents.filter((content) => content._id === currID)[0]
    );
    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };
    useEffect(
        () =>
            setfilteredContent(
                contents.filter((content) => content._id === currID)[0]
            ),
        [contents]
    );
    const history = useHistory();

    if (filteredContent) dispatch(setCurrID(filteredContent._id));
    const deleteAndResetCurrID = async () => {
        await dispatch(deleteContent(currID));
        dispatch(setCurrID(0));
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        deleteAndResetCurrID();
        history.goBack();
    };
    const handleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const checkAnswer = () => {
        if (filteredContent?.answer === userAnswer) {
            alert("Great! You got it right!");
        } else {
            alert("Oh no! it is not correct!");
        }
    };
    return (
        <div className="w-10/12 flex-col items-center justify-center ">
            <div className="w-100 text-3xl shadow-sm border-2 rounded-lg text-center h-32 flex-col items-center justify-center">
                <div className="mt-4 text-2xl">{filteredContent?.title}</div>
                <div className="flex justify-center items-center">
                    <p variant="h5" className="mt-2 text-gray-500 text-xl ">
                        {`${
                            filteredContent?.name
                                ? filteredContent.name
                                : "Nameless"
                        }`}
                    </p>
                    <p
                        variant="h5"
                        className="mt-2 ml-4 text-gray-500 text-xl "
                    >
                        {`published on ${
                            new Date(filteredContent?.createdAt).getMonth() + 1
                        }/${new Date(
                            filteredContent?.createdAt
                        ).getDate()}/${new Date(
                            filteredContent?.createdAt
                        ).getFullYear()}`}
                    </p>
                </div>
            </div>

            <div className="note mx-auto" style={{ width: "90%" }}>
                <div className="border-1 rounded-lg shadow-sm p-3 mb-3 bg-body rounded m-5 p-5">
                    <p
                        style={{
                            whiteSpace: "wrap",
                        }}
                    >
                        {filteredContent?.content}
                    </p>
                </div>

                {filteredContent?.hasChoices && (
                    <div className="choices flex items-center justify-center">
                        <div className="grid grid-cols-2 break-all mt-10 gap-10">
                            <div className="flex">
                                <div className="form-check ">
                                    <input
                                        className="form-check-input me-10 "
                                        type="radio"
                                        name="multipleChoice"
                                        value={filteredContent?.choice_1}
                                        id="choice_1"
                                        onChange={handleInputChange}
                                    />
                                    <label
                                        className="form-check-label "
                                        for="choice_1"
                                    >
                                        {filteredContent?.choice_1}
                                    </label>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="multipleChoice"
                                        value={filteredContent?.choice_2}
                                        id="choice_2"
                                        onChange={handleInputChange}
                                    />
                                    <label for="choice_2">
                                        {filteredContent?.choice_2}
                                    </label>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="multipleChoice"
                                        value={filteredContent?.choice_3}
                                        id="choice_3"
                                        onChange={handleInputChange}
                                    />
                                    <label for="choice_3">
                                        {filteredContent?.choice_3}
                                    </label>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="form-check ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="multipleChoice"
                                        value={filteredContent?.choice_4}
                                        id="choice_4"
                                        onChange={handleInputChange}
                                    />
                                    <label className="" for="choice_4">
                                        {filteredContent?.choice_4}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showAnswer && (
                    <div className="fill-blank">
                        <div className="shadow-sm p-3 mb-3 bg-body rounded m-5 p-5">
                            <p>{filteredContent?.answer}</p>
                        </div>
                    </div>
                )}
            </div>
            {!filteredContent?.hasChoices && (
                <div className="answer-field flex">
                    <input
                        className="shadow-sm p-3 mb-3 bg-body rounded justify-content-center"
                        type="text "
                        style={inputStyle}
                        onChange={handleInputChange}
                    ></input>
                </div>
            )}

            <div className="function-btns flex justify-content-center mt-10">
                <div
                    type="button"
                    className="btn btn-outline-primary me-5 mt-3"
                    onClick={checkAnswer}
                >
                    Check
                </div>
                <div
                    type="button"
                    className="btn btn-outline-primary ms-5 mt-3"
                    onClick={handleShowAnswer}
                >
                    {showAnswer ? "Hide" : "Reveal"}
                </div>
            </div>

            {(user?.result?.googleId === filteredContent?.creator ||
                user?.result?._id === filteredContent?.creator) && (
                <div className="d-flex justify-content-evenly mt-20">
                    <Link
                        to={{
                            pathname: `/contents/${filteredContent?._id}`,
                            state: {
                                id: filteredContent?._id,
                            },
                        }}
                        type="button"
                        className="btn btn-outline-secondary"
                    >
                        Edit
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Content;
