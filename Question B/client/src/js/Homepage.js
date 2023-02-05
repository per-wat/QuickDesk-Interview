import "../css/Homepage.css";

const Homepage = ()  => {
    return (
        <div className="home-container">
            <div className="home-box center-box">
                <h1>Simple Ticket System</h1>
                <h2>Choose a page   </h2>
                <div>
                    <a className="btn btn1" href="#">Customer View</a>
                </div>
                <div>
                    <a className="btn btn2" href="#">Counter Management</a>
                </div>
            </div>
        </div>
    )
}

export default Homepage;