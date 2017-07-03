
import * as React from 'react';
import { CharacterType, Character } from '../../../support/types';
import CharacterTable from './CharacterTable';
import CharacterItem from './CharacterItem';
import Button from '../../widget/Button';
import Loader from '../../widget/Loader';
import CharacterEditableItem from './CharacterEditableItem';

interface CharactersProps {
    type: CharacterType;
    items: Character[];
    isLoading: boolean;
    isError: boolean;
    isSaving: boolean;
    onLoadMore: () => void;
    onEditItem: ( item: Character ) => void;
    onEditedItem: ( editedItem: Character ) => Promise<void>;
    editingItem: Character | null;
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
        if ( this.props.editingItem == item ) {
            return <CharacterEditableItem key={ item.id } character={ item } isSaving={ this.props.isSaving }
                onSaved={ edited => this.props.onEditedItem( edited ) }/>;
        } else {
            return <CharacterItem key={ item.id } character={ item } onEditItem={ () => this.actionEditItem( item ) }/>;
        }
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

    public getMainContent(): JSX.Element {
        if ( this.props.isError ) {
            return (
                <p className="characters-error">Wystąpił błąd połączenia z serwerem API. Proszę spróbować ponownie później.</p>        
            );
        } else {
            return (
                <CharacterTable>
                    { this.props.items.map( item => this.getCharacterItem(item) ) }
                </CharacterTable>
            );
        }
    }

    public render(): JSX.Element {

        return (
            <div className="characters">
                <h4 className="characters-header">{ this.getCharacterTypeHeader() }</h4>
                { this.getMainContent() }
                { this.getBottomElement() }
            </div>
        );

    }

    public actionLoadMore(): void {
        this.props.onLoadMore();
    }

    public actionEditItem( item: Character ): void {
        this.props.onEditItem( item );
    }

}