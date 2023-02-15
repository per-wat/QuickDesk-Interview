import { gql, useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';

import CounterMng from "./CounterMng.js"
import "../css/CounterManagement.css"

const GET_COUNTERS = gql`
  query counters {
    counters {
      id status currentTicket
    }
  }
`;

const COUNTER_UPDATED = gql`
    subscription updateCounter{
        updateCounter{
            id status currentTicket
        }
    }
`

const CounterManagement = () => {

    const { data, loading, error} = useQuery(GET_COUNTERS);

    const { data: counterData, error: counterError} = useSubscription(COUNTER_UPDATED);

    const [updatedCounters, setUpdatedCounters] = useState([]);

    useEffect(() => {
        if(counterError) console.log(counterError);

        if(counterData) setUpdatedCounters(counterData.updateCounter);

    },[counterData, counterError]);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return(
        <div className="cust-container">
            <div className="cust-box center-box">
                <div className="cust-header"><h2>Counter Management</h2></div>
                <div className="cust-counter-box">
                    {updatedCounters.length > 0 ? (
                        updatedCounters.map((counter) => (
                            <CounterMng key={counter.id}
                                id={counter.id} status={counter.status}
                                currentTicket={counter.currentTicket}/>
                        ))
                    ) : (
                        data.counters.map((counter) => (
                            <CounterMng key={counter.id}
                                id={counter.id} status={counter.status}
                                currentTicket={counter.currentTicket}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default CounterManagement;