import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createContent,
    updateContent,
    setCurrID,
    getContents,
} from "../../actions/contents";
import { useHistory, useLocation } from "react-router";
import $ from "jquery";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
const CreateForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("profile"));
    const [type, setType] = useState("fillin");
    const [data, setData] = useState({
        title: null,
        content: null,
        name: null,
        createAt: null,
        tag: null,
        choice_1: null,
        choice_2: null,
        choice_3: null,
        choice_4: null,
        answer: null,
        hasChoices: null,
    });
    console.log(data);

    const clear = () => {};

    const create = async () => {
        await dispatch(createContent({ ...data, name: user?.result?.name }));
        await dispatch(getContents());
        history.goBack();
    };

    const handleChange = (e) => {
        setType(e.target.value);
        setData({ ...data, hasChoices: e.target.value == "multiple" });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.content) {
            window.alert("Please input your study content.");
            return;
        }
        if (data.content.length > 300) {
            window.alert("Content is too long! Must be under 300 characters!");
            return;
        }
        if (type == "multiple") {
            if (
                !data["choice_1"] &&
                !data["choice_2"] &&
                !data["choice_3"] &&
                !data["choice_4"]
            ) {
                window.alert("Please input at least 1 selection");
                return;
            }
            // if (
            //     data["choice_1"].length > 50 ||
            //     data["choice_2"].length > 50 ||
            //     data["choice_3"].length > 50 ||
            //     data["choice_4"].length > 50
            // ) {
            //     window.alert(
            //         "The selection is too long! Must be under 50 characters!"
            //     );
            //     return;
            // }
        }
        create();

        console.log(data);
    };
    console.log(useSelector((state) => state.contents));
    return (
        <Form
            type={type}
            data={data}
            setData={setData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        ></Form>
    );
};

export default CreateForm;
