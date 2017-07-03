
import * as React from 'react';

interface PickerItem {
    key: string;
    name: string;
}

interface PickerProps {
    items: PickerItem[] ,    
    selectedItemKey: string ,
    onSelected: ( actionKey: string ) => void ,
}

export default class Picker extends React.Component<PickerProps,{}> {

    public getPickerItem( item: PickerItem ): JSX.Element {
        const isSelected: boolean = item.key == this.props.selectedItemKey;
        return (
            <li key={ item.key } className={ isSelected ? 'picker-item active' : 'picker-item' } onClick={ () => this.actionClickItem( item ) }>
                { item.name }
            </li>
        );
    }

    public getPickerItems(): JSX.Element[] {
        return this.props.items.map( item => this.getPickerItem(item) );
    }

    public render(): JSX.Element {
        return (
            <div className="picker">
                <ul className="picker-items">
                    { this.getPickerItems() }
                </ul>
            </div>
        );  
    }

    public actionClickItem( item: PickerItem ): void {
        this.props.onSelected( item.key );
    }

}