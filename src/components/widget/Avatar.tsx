/**
 * Jazzy-Frontend
 * 
 * Component representing circular avatar with user-defined
 * image inside.
 */

import * as React from 'react';

interface AvatarProps {
    url: string ,
}

const Avatar: React.SFC<AvatarProps> = (props) => {
    return (
        <div className="avatar">
            <img src={ props.url }/>
        </div>
    );
};

export default Avatar;
