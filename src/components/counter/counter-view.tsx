import React from 'react';
import { Button, Card } from 'ui-neumorphism'

const CounterView = ({ count, setCount, buttonText }) =>
    <React.Fragment>
        <Card style={{width: "150px", padding: "5px"}}>
            <p style={{marginBottom: "5px"}}>You clicked {count} times.</p>
            <Button onClick={() => setCount(count + 1)}>{buttonText}</Button>
        </Card>
    </React.Fragment>;

export default CounterView;