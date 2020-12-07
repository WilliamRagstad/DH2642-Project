import React from 'react';
import FirestoreLoader from "./firestore-loader";
import LavastoreLoader from './lavastore-loader';

function Loaders() {
    // FirestoreLoader 'Server'
    // LavastoreLoader Client/local
    return <React.Fragment>
        <LavastoreLoader />
        <FirestoreLoader />
    </React.Fragment>
}
export default Loaders; 