import { gql, useMutation } from '@apollo/client';
import React from 'react';

import "../css/CounterMng.css";

const SET_COUNTER_STATUS = gql`
  mutation setCounterStatus($id: ID!, $status: String!) {
    setCounterStatus(id: $id, status: $status) {
      id status currentTicket
    }
  }
`;

const SET_CURRENT_TICKET = gql`
  mutation setCurrentTicket($id: ID!) {
    setCurrentTicket(id: $id) {
      id status currentTicket
    }
  }
`;

const CounterMng = React.memo(({id, status, currentTicket}) => {

    const [setCounterStatus] = useMutation(SET_COUNTER_STATUS, {
        update(_, res) {
            console.log(res);
        },
        onError(err){
            console.log(JSON.stringify(err, null, 2));
        },
    });

    const [setCurrentTicket] = useMutation(SET_CURRENT_TICKET, {
        update(_, res) {
            console.log(res);
        },
        onError(err){
            console.log(JSON.stringify(err, null, 2));
        },
    });

    const toggleClass = (event) => {
        const button = event.target;
        const status = button.classList.contains('offline') ? 'Offline' : 'Online';
        button.classList.toggle('offline');
        button.classList.toggle('online');
        setCounterStatus({variables: {id: id, status: status}});
    }

    const buttonStatus = status === "Offline" ? "online" : "offline";
    const offlineDisable = status === "Offline" ? true : false;
    const serveDisable = status === "Serving" ? true : false;

    const completeCurr = () => {
        setCounterStatus({variables: {id: id, status: "Online"}});
    }

    const callNext = () => {
        setCurrentTicket({variables: {id: id}});
    }

    return (
        <div>
            <div className="counter-box center-box">
                <div className="counter-name"><p>Counter {id}</p></div>
                <div className="button-box"><button role="button" className={`button-name ${buttonStatus}`} onClick={toggleClass}></button></div>
                <div className="button-box"><button role="button" className="button-name" onClick={completeCurr} disabled={offlineDisable}>Complete Current</button></div>
                <div className="button-box"><button role="button" className="button-name" onClick={callNext}disabled={offlineDisable || serveDisable}>Call Next</button></div>
            </div>
        </div>
    )
});

export default CounterMng;