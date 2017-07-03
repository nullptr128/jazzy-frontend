/**
 * Jazzy-Frontend
 * 
 * This is main component of Jazzy-Frontend. All UI
 * logic takes place here.
 */

import * as React from 'react';
import Navbar from 'components/layout/navbar/Navbar';
import { CharacterType, Character } from '../support/types';
import * as CharactersService from 'service/characters';
import Characters from 'components/layout/characters/Characters';

interface AppState {
    characterType: CharacterType; // type of character we are viewing (ie selected tab)
    characters: Character[]; // list of characters currently in view
    page: number; // number of page we have downloaded recently
    isLoading: boolean; // are characters loading
    isError: boolean; // is there an error with GETing characters from api?
    isSaving: boolean; // is currently edited item being saved?
    editingItem: Character | null; // currently selected item for edit (null if not selected)
}

// amount of characters to load on page
const CHARACTERS_ON_PAGE        = 20;

export default class App extends React.Component<{},AppState> {

    public state: AppState = {
        characterType: 'gnomes' ,
        characters: [] ,
        page: 1 ,
        isLoading: false ,
        isError: false ,
        isSaving: false ,
        editingItem: null ,
    };

    /**
     * Fires when component is mounted.
     */
    public componentWillMount(): void {
        // we will force change tab to gnomes in order
        // to load data
        this.actionChangeCharacterType( 'gnomes' );
    }

    /**
     * Render method.
     */
    public render(): JSX.Element {
        return (
            <div className="app">

                <Navbar characterType={ this.state.characterType }
                    onChangeCharacterType={ (newType) => this.actionChangeCharacterType( newType ) }/>
                
                <Characters type={ this.state.characterType }
                    items={ this.state.characters } 
                    isLoading={ this.state.isLoading }
                    isError={ this.state.isError }
                    isSaving={ this.state.isSaving }
                    editingItem={ this.state.editingItem }
                    onLoadMore={ () => this.actionLoadMore() }
                    onEditItem={ (item) => this.actionEditItem(item) }
                    onEditedItem={ (item) => this.actionEditedItem(item) }/>

            </div>
        );
    }

    /**
     * Changes character type you want to see and loads
     * new data from database.
     * @param newType 
     */
    public async actionChangeCharacterType( newType: CharacterType ): Promise<void> {

        // if we are already loading, disable
        // this action
        if ( this.state.isLoading ) {
            return;
        }
        
        // first of all, we are going to reset
        // whole state and set isLoading to true
        // until request returns
        this.setState( {
            characterType: newType ,
            characters: [] ,
            page: 1 ,
            isLoading: true ,
            editingItem: null ,
        } );

        try {

            // try loading fresh set of characters from api
            const characters: Character[] = await CharactersService.loadCharactersOfType( newType , {
                limit: CHARACTERS_ON_PAGE ,
                offset: 0 , 
            } );

            // disable loading and update state with new characters
            this.setState( {
                isLoading: false ,
                characters: characters ,
            } );

        } catch ( err ) {

            // on error, set isError to true and 
            // clear character list
            this.setState( {
                isLoading: false ,
                isError: true ,
                characters: [] ,
            } );

        }

    }

    /**
     * Loads next page of characters and appends it
     * to current collection.
     */
    public async actionLoadMore(): Promise<void> {

        // if we are already loading, disable this action
        if ( this.state.isLoading ) {
            return;
        }

        try {

            // set loading indicator to true
            // to give user feedback
            this.setState( {
                isLoading: true ,
            } );

            // load new page of characters from API
            const newCharacters: Character[] = await CharactersService.loadCharactersOfType( this.state.characterType , {
                limit: CHARACTERS_ON_PAGE ,
                offset: ( this.state.page ) * CHARACTERS_ON_PAGE ,
            } );

            // update state based on previous state
            this.setState( (prevState) => {
                return {
                    isLoading: false , // disable loading
                    characters: [ ...prevState.characters , ...newCharacters ] , // append new characters
                    page: prevState.page + 1 , // increase page count
                };
            } );

        } catch ( err ) {

            // if GET request fails, set error to true
            this.setState( {
                isLoading: false ,
                isError: true ,
            } );

        }

    }

    /**
     * Sets single character as editable, switching
     * standard view to form view.
     * @param item character to edit
     */
    public actionEditItem( item: Character ): void {

        // if we are already editing another character,
        // disable click-to-edit feature to prevent 
        // data loss
        if ( this.state.editingItem !== null ) {
            return;
        }

        // update editing item
        this.setState( {
            editingItem: item ,
        } );

    }

    /**
     * Sends edited data to rest API and provides user
     * feedback for action.
     * @param updateData character with updated values
     */
    public async actionEditedItem( updateData: Character ): Promise<void> {

        try {

            // set isSaving to true to turn character form
            // into loader component
            this.setState( { isSaving: true } );

            // store character id for later
            const characterId: number = this.state.editingItem.id;

            // update character via rest api and get updated one
            const result = await CharactersService.updateCharacterOfType(
                this.state.characterType , characterId , updateData
            );

            // update state
            this.setState( prevState => {
                
                // copy current state into new object
                const newState = {...prevState};
                
                // stop saving indicator
                newState.isSaving = false;

                // uncheck currently editing item
                newState.editingItem = null;

                // map whole characters array, replacing
                // edited one with the one from backend
                newState.characters.map( character => {
                    // if its a character that we just edited
                    if ( character.id == characterId ) {
                        return result; // use one returned from api
                    } else {
                        return character; // else, use original one
                    }
                } );

                return newState;

            } );

        } catch ( err ) {
            this.setState( { isSaving: false } );
            window.alert( 'An error occured during saving. Please try again later.' );
            throw new Error();
        }

    }

}
