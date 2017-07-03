/**
 * Jazzy-Frontend
 * 
 * This component shows a navbar logo, used in top-left corner.
 */

import * as React from 'react';
import Picker from '../../widget/Picker';

interface BrandProps {
    image: string;
    title: string;
}

const Brand: React.SFC<BrandProps> = (props) => {
    return (
        <div className="navbar-brand">
            <div className="navbar-brand-image">
                <img src={ props.image } alt={ props.title }/>
            </div>
        </div>
    );  
};

export default Brand;
