/**
 * Jazzy-Frontend
 * 
 * This components represents whole characters view with 
 * header and simple pagination.
 */

import * as React from 'react';
import { CharacterType, Character } from '../../../support/types';
import CharacterTable from './CharacterTable';
import CharacterItem from './CharacterItem';
import Button from '../../widget/Button';
import Loader from '../../widget/Loader';
import CharacterEditableItem from './CharacterEditableItem';

interface CharactersProps {
    type: CharacterType; // type of characters previewed
    items: Character[]; // array of visible characters
    isLoading: boolean; // is view currently loading
    isError: boolean; // has view an fatal error?
    isSaving: boolean; // is currently selected component saving atm?
    onLoadMore: () => void; // handler for "Load more" action
    onEditItem: ( item: Character ) => void; // handler for marking item to edit (by clicking it)
    onEditedItem: ( editedItem: Character ) => Promise<void>; // handler for saving edited item
    editingItem: Character | null; // currently editing character
}

export default class Characters extends React.Component<CharactersProps,{}> {

    /**
     * Transforms character type to user-friendly string.
     */
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

    /**
     * Prepares single character row.
     * @param item character for that row
     */
    public getCharacterItem( item: Character ): JSX.Element {
        // if this item is one we are currently editing,
        // use CharacterEditableItem component
        if ( this.props.editingItem == item ) {
            return <CharacterEditableItem key={ item.id } character={ item } isSaving={ this.props.isSaving }
                onSaved={ edited => this.props.onEditedItem( edited ) }/>;
        } else {
            // else, use standard CharacterItem component instead
            return <CharacterItem key={ item.id } character={ item } onEditItem={ () => this.actionEditItem( item ) }/>;
        }
    }

    /**
     * Prepares element under the table with characters
     */
    public getBottomElement(): JSX.Element {
        // if view is loading, display loader, else display "load more" button
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

    /**
     * Prepares main table content.
     */
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

    /**
     * Handles clicking on Load More button.
     */
    public actionLoadMore(): void {
        this.props.onLoadMore();
    }

    /**
     * Handler clicking on row, marking it for editing.
     * @param item character that we have clicked onto
     */
    public actionEditItem( item: Character ): void {
        this.props.onEditItem( item );
    }

}