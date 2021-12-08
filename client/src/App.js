import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getContents } from "./actions/contents";
import Nav from "./components/Navbar/Nav";
import Header from "./components/Navbar/Header";
import EditForm from "./components/Edit/EditForm";
import CreateForm from "./components/Create/CreateForm";
import Home from "./components/Home/Home";
import Test from "./components/Test/Test";
import Content from "./components/Contents/Content/Content";
import Tags from "./components/Contents/Tags";
import ContentList from "./components/Contents/Content/ContentList";
import Auth from "./components/Auth/Auth";
import "./index.css";
const App = () => {
    // const [currID, setcurrID] = useState(0);
    const dispatch = useDispatch();
    const currID = useSelector((state) => state.currid);
    const contents = useSelector((state) => state.contents);
    console.log(currID);
    useEffect(() => {
        dispatch(getContents());
    }, [currID, dispatch]);
    return (
        <Router>
            <Header />
            <div
                className="mt-32 d-flex flex-column align-items-center "
                style={{
                    height: "94vh",
                    width: "60%",
                    padding: "8em",
                    margin: "0 auto",
                    boxShadow: "1px 50px 36px -3px rgba(0,0,0,0.31)",
                }}
            >
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                    <Route path="/create">
                        <CreateForm />
                    </Route>
                    <Route path="/contents/:id">
                        <EditForm />
                    </Route>
                    <Route path="/tags/:tags/:id">
                        <Content />
                    </Route>
                    <Route path="/tags/:tag">
                        <ContentList />
                    </Route>
                    <Route path="/tags">
                        <Tags />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
