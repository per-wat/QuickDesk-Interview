import { gql, useQuery, useMutation } from '@apollo/client';

import CounterView from "./CounterView.js"
import "../css/CustomerView.css"
import { useEffect } from 'react';

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

const CustomerView = () => {

    const { data, loading, error} = useQuery(GET_COUNTERS, {
        pollInterval: 500,
    });

    const [addTicket] = useMutation(ADD_TICKET, {
        update(_, res) {
            console.log(res);
        },
        onError(err){
            console.log(JSON.stringify(err, null, 2));
        },
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return(
        <div className="cust-container">
            <div className="cust-box center-box">
                <div className="cust-header"><h2>Customer View</h2></div>
                <div className="take-num">
                    <div><h3>Now Serving: {data.nowServing}</h3></div>
                    <div><h3>Last Number: {data.lastIssuedTicket}</h3></div>
                    <div className="button-box">
                        <button role="button" className="button-name" onClick={addTicket}>
                            Take a Number
                        </button>
                    </div>
                </div>
                <div className="cust-counter-box">
                    {data.counters.map((counter) => (
                        <CounterView key={counter.id}
                            id={counter.id} status={counter.status}
                            currentTicket={counter.currentTicket}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CustomerView;