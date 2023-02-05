import { gql, useQuery } from '@apollo/client';

import CounterMng from "./CounterMng.js"
import "../css/CounterManagement.css"

const GET_COUNTERS = gql`
  query counters {
    counters {
      id status currentTicket
    }
  }
`;

const CounterManagement = () => {

    const { data, loading, error} = useQuery(GET_COUNTERS, {
        pollInterval: 500,
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return(
        <div className="cust-container">
            <div className="cust-box center-box">
                <div className="cust-header"><h2>Counter Management</h2></div>
                <div className="cust-counter-box">
                    {data.counters.map((counter) => (
                        <CounterMng key={counter.id}
                            id={counter.id} status={counter.status}
                            currentTicket={counter.currentTicket}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CounterManagement;