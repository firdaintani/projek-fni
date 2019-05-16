import React from 'react';
// import ReactDOM from 'react-dom';
import Countdown from 'react-countdown-now';

// Random component
const Completionist = () => <span>You are good to go!</span>;

class Countdowns extends React.Component {
    state={time : ''}
    componentWillReceiveProps(newProps){
        this.setState({time : newProps.payment_due})
    }
    getTimes = () => {
        // var selected = '13 May 2019 18:50:10'
        var d = new Date(this.state.time);
        var ms = d.getTime();
        return ms-Date.now();
    }

    render() {
        return (
            <div className="container" style={{ marginTop: '80px' }}>
                <p>{this.state.time} lo</p>
                <Countdown date={ Date.now() + this.getTimes() }>
                    <Completionist />
                </Countdown>
            </div>
        )
    }
}
export default Countdowns