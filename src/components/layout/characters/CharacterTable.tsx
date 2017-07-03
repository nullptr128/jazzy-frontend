
import * as React from 'react';

interface CharacterTableProps {

}

export default class CharacterTable extends React.Component<CharacterTableProps,{}> {

    public render(): JSX.Element {
        return (
            <div className="characters-table">
                <ul className="characters-table-items">
                    { this.props.children }
                </ul>
            </div>
        );
    }   

}