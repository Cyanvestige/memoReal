const Form = ({ type, data, setData, handleChange, handleSubmit }) => {
    return (
        <div>
            <div style={{ width: "35vw", paddingBottom: "10%" }}>
                <div className="mb-4">
                    <label className="form-label">Title</label>
                    <input
                        className="form-control"
                        id="title"
                        value={data.title}
                        onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                        }
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Tag</label>
                    <input
                        className="form-control"
                        id="tag"
                        value={data.tag}
                        onChange={(e) =>
                            setData({ ...data, tag: e.target.value })
                        }
                    />
                </div>
                <div
                    className="checks d-flex justify-content-evenly"
                    style={{ marginTop: "2em" }}
                >
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            onChange={handleChange}
                            value="fillin"
                            checked={type == "fillin"}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                            Fill-in-the-blank
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value="multiple"
                            onChange={handleChange}
                            checked={type == "multiple"}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                            Multiple Choice
                        </label>
                    </div>
                </div>
                <div>
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="6"
                        value={data.content}
                        onChange={(e) =>
                            setData({ ...data, content: e.target.value })
                        }
                    ></textarea>
                </div>
                {type == "multiple" && (
                    <div class="multiple-choice">
                        <div className="mt-3">
                            <label className="form-label">Choice 1</label>
                            <textarea
                                className="form-control"
                                id="choice_1"
                                rows="1"
                                value={data.choice_1}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        choice_1: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Choice 2</label>
                            <textarea
                                className="form-control"
                                id="choice_2"
                                rows="1"
                                value={data.choice_2}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        choice_2: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Choice 3</label>
                            <textarea
                                className="form-control"
                                id="choice_3"
                                rows="1"
                                value={data.choice_3}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        choice_3: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                        <div className="mt-3">
                            <label className="form-label">Choice 4</label>
                            <textarea
                                className="form-control"
                                id="choice_4"
                                rows="1"
                                value={data.choice_4}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        choice_4: e.target.value,
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                )}
                <div class="fill-blank">
                    <div className="mt-3">
                        <label className="form-label">Answer</label>
                        <textarea
                            className="form-control"
                            id="answer"
                            rows="2"
                            value={data.answer}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    answer: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                </div>

                <input
                    class="btn btn-outline-secondary mt-4"
                    type="submit"
                    value="Submit"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Form;
