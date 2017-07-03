/**
 * Jazzy-Frontend
 * 
 * Simple button component.
 */

import * as React from 'react';

interface ButtonProps {
    caption: string ,
    onClick: () => void ,
}

const Button: React.SFC<ButtonProps> = (props) => {
    return (
        <button className="button button-purple" onClick={ () => props.onClick() }>
            { props.caption }
        </button>
    );
};

export default Button;
