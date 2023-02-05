import "../css/CounterMng.css";

const CounterMng = () => {
    return (
        <div>
            <div className="counter-box center-box">
                <div className="counter-name"><p>Counter 1</p></div>
                <div className="button-box"><button role="button" class="button-name offline"></button></div>
                <div className="button-box"><button role="button" class="button-name">Complete Current</button></div>
                <div className="button-box"><button role="button" class="button-name">Call Next</button></div>
            </div>
        </div>
    )
}

export default CounterMng;