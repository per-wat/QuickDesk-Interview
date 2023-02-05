import CounterMng from "./CounterMng.js"
import "../css/CounterManagement.css"

const CounterManagement = () => {
    return(
        <div className="cust-container">
            <div className="cust-box center-box">
                <div className="cust-header"><h2>Counter Management</h2></div>
                <div className="cust-counter-box">
                    <CounterMng/>
                    <CounterMng/>
                    <CounterMng/>
                    <CounterMng/>
                </div>
            </div>
        </div>
    )
}

export default CounterManagement;