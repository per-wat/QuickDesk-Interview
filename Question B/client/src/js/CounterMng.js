import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Popup from "reactjs-popup";

import "../css/CounterMng.css";
import "../css/Popup.css";
import 'reactjs-popup/dist/index.css';

const SET_COUNTER_STATUS = gql`
  mutation setCounterStatus($id: ID!, $status: String!) {
    setCounterStatus(id: $id, status: $status) {
      id
      status
      currentTicket
    }
  }
`;

const SET_CURRENT_TICKET = gql`
  mutation setCurrentTicket($id: ID!) {
    setCurrentTicket(id: $id) {
      id
      status
      currentTicket
    }
  }
`;

const CounterMng = React.memo(({ id, status, currentTicket }) => {

    const [openPopup, setOpenPopup] = useState(false);

  const [setCounterStatus] = useMutation(SET_COUNTER_STATUS, {
    update(_, res) {
      console.log(res);
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
  });

  const [setCurrentTicket] = useMutation(SET_CURRENT_TICKET, {
    update(_, res) {
      console.log(res);
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
      setOpenPopup(true);
    },
  });

  const toggleClass = (event) => {
    const button = event.target;
    const status = button.classList.contains("offline") ? "Offline" : "Online";
    button.classList.toggle("offline");
    button.classList.toggle("online");
    setCounterStatus({ variables: { id: id, status: status } });
  };

  const buttonStatus = status === "Offline" ? "online" : "offline";
  const offlineDisable = status === "Offline" ? true : false;
  const serveDisable = status === "Serving" ? true : false;

  const completeCurr = () => {
    setCounterStatus({ variables: { id: id, status: "Online" } });
  };

  const callNext = () => {
    setCurrentTicket({ variables: { id: id } });
  };

  return (
    <div>
      <Popup
        open={openPopup}
        closeOnDocumentClick
        onClose={() => setOpenPopup(false)}
      >
        <div className="modal-container">
          <div className="modal-info">
            <p>No tickets in the waiting queue</p>
            <button onClick={() => setOpenPopup(false)}>Close</button>
          </div>
        </div>
      </Popup>
      <div className="counter-box center-box">
        <div className="counter-name">
          <p>Counter {id}</p>
        </div>
        <div className="button-box">
          <button
            role="button"
            className={`button-name ${buttonStatus}`}
            onClick={toggleClass}
            disabled={serveDisable}
          ></button>
        </div>
        <div className="button-box">
          <button
            role="button"
            className="button-name"
            onClick={completeCurr}
            disabled={offlineDisable || !serveDisable}
          >
            Complete Current
          </button>
        </div>
        <div className="button-box">
          <button
            role="button"
            className="button-name"
            onClick={callNext}
            disabled={offlineDisable || serveDisable}
          >
            Call Next
          </button>
        </div>
      </div>
    </div>
  );
});

export default CounterMng;
