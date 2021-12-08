import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
const Test = () => {
    const inputStyle = {
        margin: "2em auto",
    };
    const location = useLocation();
    const [index, setIndex] = useState(0);
    const contents = useSelector((state) => state.contents);
    const { tag } = location.state;
    console.log(tag);
    const [filteredContents, setFilteredContents] = useState([
        ...contents.filter((content) => content.tag === tag),
    ]);
    console.log(filteredContents);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState("");
    const handleInputChange = (e) => {
        setAnswer(e.target.value);
    };

    const switchNext = () => {
        if (index === filteredContents.length - 1) return;
        if (answer === filteredContents[index].answer) setScore(score + 1);
        setIndex(index + 1);
    };

    const handleSubmit = async () => {
        if (answer === filteredContents[index].answer)
            alert(
                `You got ${score + 1} problems right (${
                    (score + 1) / filteredContents.length
                })`
            );
        else
            alert(
                `You got ${score} ${
                    score === 1 ? "problem" : "problems"
                } right (${((100 * score) / filteredContents.length).toFixed(
                    2
                )})%`
            );
    };
    console.log(score);
    return (
        <div className="w-8/12 flex-col items-center justify-content-center ">
            <div className=" flex-col items-center justify-content-center ">
                <div className="title flex align-items-center justify-content-between">
                    <h3>Test Mode</h3>
                    <h5 className="text-muted">
                        {index + 1}/{filteredContents.length}
                    </h5>
                </div>

                <div className="text-3xl shadow-sm border-2 rounded-lg text-center h-32 flex-col items-center justify-center">
                    <div className="mt-4">{filteredContents[index].title}</div>

                    <div className="flex justify-center items-center">
                        <p variant="h5" className="mt-2 text-gray-500 text-xl ">
                            {`${
                                filteredContents[index].name
                                    ? filteredContents[index].name
                                    : "Nameless"
                            }`}
                        </p>
                        <p
                            variant="h5"
                            className="mt-2 ml-4 text-gray-500 text-xl "
                        >
                            {`published on ${
                                new Date(
                                    filteredContents[index].createdAt
                                ).getMonth() + 1
                            }/${new Date(
                                filteredContents[index].createdAt
                            ).getDate()}/${new Date(
                                filteredContents[index].createdAt
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
                            {filteredContents[index].content}
                        </p>
                    </div>

                    {filteredContents[index].hasChoices && (
                        <div className="choices flex items-center justify-center">
                            <div className="grid grid-cols-2 break-all mt-10 gap-10">
                                <div class="flex">
                                    <div class="form-check ">
                                        <input
                                            class="form-check-input me-10 "
                                            type="radio"
                                            name="multipleChoice"
                                            value={
                                                filteredContents[index].choice_1
                                            }
                                            id="choice_1"
                                            onChange={handleInputChange}
                                        />
                                        <label
                                            className="form-check-label "
                                            for="choice_1"
                                        >
                                            {filteredContents[index].choice_1}
                                        </label>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="form-check ">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="multipleChoice"
                                            value={
                                                filteredContents[index].choice_2
                                            }
                                            id="choice_2"
                                            onChange={handleInputChange}
                                        />
                                        <label for="choice_2">
                                            {filteredContents[index].choice_2}
                                        </label>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="form-check ">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="multipleChoice"
                                            value={
                                                filteredContents[index].choice_3
                                            }
                                            id="choice_3"
                                            onChange={handleInputChange}
                                        />
                                        <label for="choice_3">
                                            {filteredContents[index].choice_3}
                                        </label>
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="form-check ">
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="multipleChoice"
                                            value={
                                                filteredContents[index].choice_4
                                            }
                                            id="choice_4"
                                            onChange={handleInputChange}
                                        />
                                        <label class="" for="choice_4">
                                            {filteredContents[index].choice_4}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {!filteredContents[index].hasChoices && (
                    <div class="answer-field flex">
                        <input
                            class="shadow-sm p-3 mb-3 bg-body rounded justify-content-center"
                            type="text "
                            style={inputStyle}
                            onChange={handleInputChange}
                        ></input>
                    </div>
                )}
                <div className="page-switch flex justify-content-center">
                    {index === filteredContents.length - 1 ? (
                        <div
                            type="button"
                            class="btn btn-outline-primary btn-sm mt-5"
                            onClick={handleSubmit}
                        >
                            Submit
                        </div>
                    ) : (
                        <div
                            type="button"
                            class="btn btn-outline-primary btn-sm mt-5"
                            onClick={switchNext}
                        >
                            Next
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Test;
