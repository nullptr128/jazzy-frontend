
import * as React from 'react';
import { CharacterType, Character } from '../../../support/types';
import CharacterTable from './CharacterTable';
import CharacterItem from './CharacterItem';
import Button from '../../widget/Button';
import Loader from '../../widget/Loader';

interface CharactersProps {
    type: CharacterType;
    items: Character[];
    onLoadMore: () => void;
    isLoading: boolean;
}

export default class Characters extends React.Component<CharactersProps,{}> {

    public getCharacterTypeHeader(): string {
        switch( this.props.type ) {
            case 'gnomes':
                return 'Gnomes';
            case 'trolls':
                return 'Trolls';
            default:
                throw new Error( 'Unknown character type: ' + this.props.type );
        }
    }

    public getCharacterItem( item: Character ): JSX.Element {
        return (
            <CharacterItem key={ item.id } character={ item }/>
        );
    }

    public getBottomElement(): JSX.Element {
        if ( this.props.isLoading ) {
            return (
                <div className="characters-loading">
                    <Loader isVisible={ true }/>
                </div>
            );
        } else {
            return (
                <div className="characters-button">
                    <Button caption="Load more..." onClick={ () => this.actionLoadMore() }/>
                </div>
            );
        }
    }

    public render(): JSX.Element {

        let bottomElement: JSX.Element = null;

        return (
            <div className="characters">
                
                <h4 className="characters-header">{ this.getCharacterTypeHeader() }</h4>
                
                <CharacterTable>
                    { this.props.items.map( item => this.getCharacterItem(item) ) }
                </CharacterTable>
                
                { this.getBottomElement() }

            </div>
        );
    }

    public actionLoadMore(): void {
        this.props.onLoadMore();
    }

}