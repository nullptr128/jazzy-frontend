/**
 * Jazzy-Frontend
 * 
 * Entry point for application.
 */

import 'reset-css/reset.css';
import 'style/index.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'components/App';

window.addEventListener( 'load' , () => {

    const appElement: HTMLElement = document.getElementById( 'root' );

    if ( appElement ) {
        ReactDOM.render( React.createElement( App ) , appElement );
    } else {
        throw new Error( 'Mailformed HTML file - no #app element present.' );
    }

} );
