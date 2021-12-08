import React, { useState, useEffect } from "react";
import style from "./style.css";

const Home = () => {
    let now = new Date();
    // const fetchQuote = new Promise((resolve, reject) =>
    //     fetch("https://type.fit/api/quotes")
    //         .then((response) => {
    //             if (!response.ok) reject("Fetch failed");
    //             return response.json();
    //         })
    //         .then((data) => {
    //             resolve(data[dateCode % data.length]);
    //         })
    // );

    const date = new Date();
    const year = "" + date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = "" + date.getDate();
    const dateCode = +(year + month + day);
    const [hour, setHour] = useState(now.getHours() % 12);
    const [minute, setMinute] = useState(now.getMinutes());
    const [second, setSecond] = useState(now.getSeconds());
    // const [quote, setQuote] = useState("");
    // useEffect(() => {
    //     fetchQuote.then((quote) => setQuote(quote));
    // });
    useEffect(() => {
        console.log(now.getHours() % 12);
        const interval = setInterval(() => {
            let now = new Date();
            setHour(now.getHours() % 12);
            setMinute(now.getMinutes());
            setSecond(now.getSeconds());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <div class="clock">
                <div class="clock_face">
                    <div class="clock_hands">
                        <div
                            class="clock_hand clock_hours"
                            style={{
                                transform: `rotate(${
                                    (360 / 12) * hour + (360 / 12 / 60) * minute
                                }deg)`,
                            }}
                        ></div>
                        <div
                            class="clock_hand clock_minutes"
                            style={{
                                transform: `rotate(${
                                    (360 / 60) * minute +
                                    (360 / 60 / 60) * second
                                }deg)`,
                            }}
                        ></div>
                        <div
                            class="clock_hand clock_seconds"
                            style={{
                                transform: `rotate(${(360 / 60) * second}deg)`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            {/* <div className="quote">
                <div className="text">{quote.text}</div>
                <div className="author">{"-----" + quote.author}</div>
            </div> */}
        </div>
    );
};
export default Home;
