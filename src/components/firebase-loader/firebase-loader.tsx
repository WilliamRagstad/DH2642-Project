import React from 'react';
import { LoadServices } from './service-loader';
import { LoadApp } from './app-loader';

function FirebaseLoader() {

    LoadApp();
    LoadServices();

    return <React.Fragment />;
}

export default FirebaseLoader;