
import * as React from 'react';

interface LoaderProps {
    isVisible: boolean;
    type?: string;
}

const Loader: React.SFC<LoaderProps> = (props) => {
    if ( props.isVisible ) {
        return (
            <div className={ props.type ? `loader loader-${props.type}` : 'loader' }>
                <img src="img/loading.svg"/>
            </div>
        );
    } else {
        return null;
    }
};

export default Loader;
