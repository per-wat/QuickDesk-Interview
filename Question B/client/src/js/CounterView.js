import React, { useEffect, useState } from "react";

import "../css/CounterView.css"

const CounterView = React.memo(({id, status, currentTicket}) => {

    const [counterDisable, setCounterDisable] = useState("");
    const [counterServe, setCounterServe] = useState("");
    const [counterOnline, setCounterOnline] = useState("");

    useEffect(() => {
        setCounterDisable(status === "Offline" ? "disabled" : "");
        setCounterServe(status === "Serving" ? "serving" : "");
        setCounterOnline(status === "Online" ? "online" : "");
    }, [status])

    return (
        <div>
            <div className={`counter-box center-box ${counterDisable} ${counterServe} ${counterOnline}`}>
                <div className="status-box">
                    <div className="status">
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="counter-name"><p>Counter {id}</p></div>
                <div className="number">
                    {
                        status === "Serving" ? (
                            <p>{currentTicket}</p>
                        ) : status === "Online" ? (
                            <p>Online</p>
                        ) : (
                            <p>Offline</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
});

export default CounterView;