import React from 'react';
import { Button } from 'ui-neumorphism'

const CounterView = ({ count, setCount, buttonText }) =>
    <React.Fragment>
        <p>You clicked {count} times.</p>
        <Button onClick={() => setCount(count + 1)}>{buttonText}</Button>
    </React.Fragment>;

export default CounterView;