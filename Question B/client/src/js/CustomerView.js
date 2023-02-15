import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import Popup from "reactjs-popup";

import CounterView from "./CounterView.js";
import "../css/CustomerView.css";
import "../css/Popup.css";
import 'reactjs-popup/dist/index.css';

const GET_COUNTERS = gql`
  query counters {
    counters {
      id status currentTicket
    }
    nowServing
    lastIssuedTicket
  }
`;

const ADD_TICKET = gql`
  mutation addTicket {
    addTicket
  }
`;

const NOW_SERVE_UPDATED = gql`
    subscription updateNowServing{
        updateNowServing
    }
`;

const LAST_ISSUED_UPDATED = gql`
    subscription updateLastIssued{
        updateLastIssued
    }
`

const COUNTER_UPDATED = gql`
    subscription updateCounter{
        updateCounter{
            id status currentTicket
        }
    }
`

const CustomerView = () => {

    const { data, loading, error} = useQuery(GET_COUNTERS);

    const { data: serveData, error: serverError} = useSubscription(NOW_SERVE_UPDATED);
    const { data: lastData, error: lastError} = useSubscription(LAST_ISSUED_UPDATED);
    const { data: counterData, error: counterError} = useSubscription(COUNTER_UPDATED);
    const [openPopup, setOpenPopup] = useState(false);
    const [ticketNumber, setTicketNumber] = useState("");

    const [addTicket] = useMutation(ADD_TICKET, {
        update(_, res) {
            console.log(res);
            setTicketNumber(res.data.addTicket);
            setOpenPopup(true);
        },
        onError(err){
            console.log(JSON.stringify(err, null, 2));
        },
    });

    const [nowServing, setNowServing] = useState('');
    const [lastIssuedTicket, setLastIssuedTicket] = useState('');
    const [updatedCounters, setUpdatedCounters] = useState([]);

    useEffect(() => {
        if(serverError) console.log(serverError);

        if(lastError) console.log(lastError);

        if(counterError) console.log(counterError);

        if(serveData) setNowServing(serveData.updateNowServing);

        if(lastData) setLastIssuedTicket(lastData.updateLastIssued);

        if(counterData) setUpdatedCounters(counterData.updateCounter);

    },[serveData, serverError, lastData, lastError, counterData, counterError]);
    
    if (loading) {return 'Loading...';}
    if (error)  {return `Error! ${error.message}`;}

    return(
        <div className="cust-container">
            <Popup
                open={openPopup}
                closeOnDocumentClick
                onClose={() => setOpenPopup(false)}
            >
                <div className="modal-container">
                <div className="modal-info">
                    <p>Your ticket number is </p>
                    <p>{ticketNumber}</p>
                    <button onClick={() => setOpenPopup(false)}>Close</button>
                </div>
                </div>
            </Popup>
            <div className="cust-box center-box">
                <div className="cust-header"><h2>Customer View</h2></div>
                <div className="take-num">
                    <div><h3>Now Serving: {nowServing === '' ? data.nowServing : nowServing}</h3></div>
                    <div><h3>Last Number: {lastIssuedTicket === '' ? data.lastIssuedTicket : lastIssuedTicket}</h3></div>
                    <div className="button-box">
                        <button role="button" className="button-name" onClick={addTicket}>
                            Take a Number
                        </button>
                    </div>
                </div>
                <div className="cust-counter-box">
                    {updatedCounters.length > 0 ? (
                        updatedCounters.map((counter) => (
                            <CounterView key={counter.id}
                                id={counter.id} status={counter.status}
                                currentTicket={counter.currentTicket}/>
                        ))
                    ) : (
                        data.counters.map((counter) => (
                            <CounterView key={counter.id}
                                id={counter.id} status={counter.status}
                                currentTicket={counter.currentTicket}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomerView;