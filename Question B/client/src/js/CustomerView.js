import CounterView from "./CounterView.js"
import "../css/CustomerView.css"

const CustomerView = () => {
    return(
        <div className="cust-container">
            <div className="cust-box center-box">
                <div className="cust-header"><h2>Customer View</h2></div>
                <div className="take-num">
                    <div><h3>Now Serving: </h3></div>
                    <div><h3>Last Number: </h3></div>
                    <div className="button-box">
                        <button role="button" class="button-name">
                            Take a Number
                        </button>
                    </div>
                </div>
                <div className="cust-counter-box">
                    <CounterView/>
                    <CounterView/>
                    <CounterView/>
                    <CounterView/>
                </div>
            </div>
        </div>
    )
}

export default CustomerView;