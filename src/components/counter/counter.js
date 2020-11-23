import React, { useState } from 'react';
import CounterView from './counter-view';

function Counter() {
    const [count, setCount] = useState(0);

    return React.createElement(CounterView, {
        count,
        setCount,
        buttonText: "Click me!"
    });
}

export default Counter;