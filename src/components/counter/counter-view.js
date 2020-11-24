import React from 'react';

const CounterView = ({ count, setCount, buttonText }) =>
    <React.Fragment>
        <p>You clicked {count} times.</p>
        <button onClick={() => setCount(count + 1)}>{buttonText}</button>
    </React.Fragment>;

export default CounterView;