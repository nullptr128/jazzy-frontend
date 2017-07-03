/**
 * Jazzy-Frontend
 * 
 * Navbar component.
 */

import * as React from 'react';
import Brand from './Brand';
import Picker from '../../widget/Picker';
import Button from '../../widget/Button';
import UserWidget from '../../widget/UserWidget';
import { CharacterType } from '../../../support/types';

interface NavbarProps {
    characterType: CharacterType; // type of character currently selected
    onChangeCharacterType: (newType: CharacterType) => void; // fires when user changes tab
}

export default class Navbar extends React.Component<NavbarProps> {

    // tabs are defined satically for now
    private items = [
        { key: 'gnomes' , name: 'Gnomes' } ,
        { key: 'trolls' , name: 'Trolls' } ,
    ];

    public render(): JSX.Element {
        return (
            <div className="navbar">
                
                <Brand image="img/logo.png" title="Frontend"/>

                <div className="navbar-picker">
                    <Picker items={ this.items } selectedItemKey={ this.props.characterType } onSelected={ (newValue) => this.actionChangeTab( newValue ) }/>
                </div>

                <div className="navbar-right">
                    <div className="navbar-create-monster">
                        <Button caption="Create monster" onClick={ () => this.actionCreateMonster() } />
                    </div>
                    <div className="navbar-user-widget">
                        <UserWidget name="Robert Łabuś" role="Game Master" avatar="img/avatar.png" />                    
                    </div>
                </div>
                
            </div>
        );
    }

    /**
     * Notifies parent component that we have changed
     * current tab.
     * @param newValue newly choosen character type
     */
    public actionChangeTab( newValue: string ): void {
        this.props.onChangeCharacterType( newValue as CharacterType );
    }

    /**
     * Handles clicking on Create Monster button.
     */
    public actionCreateMonster(): void {
        window.alert( 'createMonster' );
    }

}
