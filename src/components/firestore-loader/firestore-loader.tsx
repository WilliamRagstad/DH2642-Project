import React from 'react';
import { LoadServices } from './service-loader';
import { LoadApp } from './app-loader';

function FirestoreLoader() {

    LoadApp();
    LoadServices();

    return <React.Fragment />;
}

export default FirestoreLoader;