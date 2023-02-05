import "../css/CounterView.css"

const CounterView = () => {
    return (
        <div>
            <div className="counter-box center-box disabled">
                <div className="status-box">
                    <div className="status">
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="counter-name"><p>Counter 1</p></div>
                <div className="number">
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default CounterView;