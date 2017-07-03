
import * as React from 'react';
import Navbar from 'components/layout/navbar/Navbar';
import { CharacterType, Character } from '../support/types';
import * as CharactersService from 'service/characters';
import Characters from 'components/layout/characters/Characters';

interface AppState {
    characterType: CharacterType;    
    characters: Character[];
    page: number;
    isLoading: boolean;
    isError: boolean;
}

const CHARACTERS_ON_PAGE        = 20;

export default class App extends React.Component<{},AppState> {

    public state: AppState = {
        characterType: 'gnomes' ,
        characters: [] ,
        page: 1 ,
        isLoading: false ,
        isError: false ,
    };

    public componentWillMount(): void {
        this.actionChangeCharacterType( 'gnomes' );
    }

    public render(): JSX.Element {
        return (
            <div className="app">

                <Navbar characterType={ this.state.characterType }
                    onChangeCharacterType={ (newType) => this.actionChangeCharacterType( newType ) }/>
                
                <Characters type={ this.state.characterType }
                    items={ this.state.characters } 
                    onLoadMore={ () => this.actionLoadMore() }
                    isLoading={ this.state.isLoading }/>

            </div>
        );
    }

    public async actionChangeCharacterType( newType: CharacterType ): Promise<void> {

        if ( this.state.isLoading ) {
            return;
        }
        
        this.setState( {
            characterType: newType ,
            characters: [] ,
            page: 1 ,
            isLoading: true ,
        } );

        try {

            const characters: Character[] = await CharactersService.loadCharactersOfType( newType , {
                limit: CHARACTERS_ON_PAGE ,
                offset: 0 , 
            } );

            this.setState( {
                isLoading: false ,
                characters: characters ,
            } );

        } catch ( err ) {

            this.setState( {
                isLoading: false ,
                isError: true ,
                characters: [] ,
            } );

        }

    }

    public async actionLoadMore(): Promise<void> {

        if ( this.state.isLoading ) {
            return;
        }

        try {

            this.setState( {
                isLoading: true ,
            } );

            const newCharacters: Character[] = await CharactersService.loadCharactersOfType( this.state.characterType , {
                limit: CHARACTERS_ON_PAGE ,
                offset: ( this.state.page ) * CHARACTERS_ON_PAGE ,
            } );

            this.setState( (prevState) => {
                return {
                    isLoading: false ,
                    characters: [ ...prevState.characters , ...newCharacters ] ,
                    page: prevState.page + 1 ,
                };
            } );

        } catch ( err ) {

            this.setState( {
                isLoading: false ,
                isError: true ,
            } );

        }

    }

}
