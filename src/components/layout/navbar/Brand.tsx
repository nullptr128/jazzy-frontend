
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
                <img src={ props.image }/>
            </div>
        </div>
    );  
};

export default Brand;
