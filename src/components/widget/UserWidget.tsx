
import * as React from 'react';
import Avatar from './Avatar';

interface UserWidgetProps {
    avatar: string ,
    name: string ,
    role: string ,
}

const UserWidget: React.SFC<UserWidgetProps> = (props) => {
    return (
        <div className="user-widget">
            <div className="user-widget-avatar">
                <Avatar url={ props.avatar }/>
            </div>
            <div className="user-widget-details">
                <div className="user-widget-name">
                    { props.name }
                </div>
                <div className="user-widget-role">
                    { props.role }
                </div>
            </div>
        </div>
    );
};  

export default UserWidget;
