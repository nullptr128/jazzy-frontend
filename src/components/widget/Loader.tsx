
import * as React from 'react';

interface LoaderProps {
    isVisible: boolean;
}

const Loader: React.SFC<LoaderProps> = (props) => {
    if ( props.isVisible ) {
        return (
            <div className="loader">
                <img src="img/loading.svg"/>
            </div>
        );
    } else {
        return null;
    }
};

export default Loader;
