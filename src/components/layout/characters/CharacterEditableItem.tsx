/**
 * Jazzy-Frontend
 * 
 * Component representing character that is currently selected to edit.
 * This component stores its own state representing updated values of
 * original Character object. After user clicks "Save" button, it sends
 * updated Character to parent component via onSaved prop.
 */

import * as React from 'react';
import { Character } from '../../../support/types';
import Avatar from '../../widget/Avatar';
import TextInput from '../../widget/TextInput';
import Button from '../../widget/Button';
import Loader from '../../widget/Loader';

interface CharacterEditableItemProps {
    character: Character; // original character
    isSaving: boolean; // is view currently saving
    onSaved: (editedCharacter: Character) => Promise<void>; // handler for editing
}

interface CharacterEditableItemState {
    // holds an updated values from original character;
    // Partial<Character> is the same as Character, but
    // no field is mandatory to fulfill type (all are optional).
    editedCharacter: Partial<Character>;
}

export default class CharacterEditableItem extends React.Component<CharacterEditableItemProps,CharacterEditableItemState> {

    public state = {
        editedCharacter: {} ,
    };

    /**
     * Prepares a group with label+input that accepts text content.
     * @param label label for form group
     * @param key key we are editing on Character object (for example: 'id' or 'name')
     */
    public getEditGroupString( label: string , key: keyof Character ): JSX.Element {
        return (
            <div className="character-item-edit-group">
                <label>{ label }</label>
                <TextInput type="text" value={ this.getValue( key ) }
                    onChange={ value => this.actionUpdateValue( key , value ) }/>
            </div>
        );  
    }

    /**
     * Prepares a group with label+input that accepts numeric content.
     * @param label label for form group
     * @param key key we are editing on Character object (for example: 'id' or 'name')
     * @param range optional minimum and maximum numeric value
     */
    public getEditGroupNumber( label: string , key: keyof Character , range?: { min: number , max: number } ): JSX.Element {
        return (
            <div className="character-item-edit-group">
                <label>{ label }</label>
                <TextInput type="number" value={ this.getValue( key ) } 
                    onChange={ value => this.actionUpdateValue( key , Number(value) ) }
                    min={ range ? range.min : undefined }
                    max={ range ? range.max : undefined }/>
            </div>
        );
    }

    public render(): JSX.Element {
        if ( this.props.isSaving ) {
            return (
                <div className="character-item saving">
                    <Loader isVisible={ true } type="small"/>
                    <p className="character-item-saving-text">Saving gnome...</p>
                </div>
            );
        } else {
            return (
                <div className="character-item editing">
                    <div className="character-item-avatar">
                        <Avatar url="img/character-avatar.png"/>
                    </div>
                    { this.getEditGroupString( 'Name:' , 'name' ) }
                    { this.getEditGroupNumber( 'Age:' , 'age' ) }
                    { this.getEditGroupNumber( 'Strength:' , 'strenght' , { min: 1 , max: 100 } ) }
                    <div className="character-item-save">
                        <Button caption="Save" onClick={ () => this.actionSave() }/>
                    </div>
                </div>
            );  
        }
    }

    /**
     * Gets most valid value from character; if value is stored in
     * editedCharacter state, its returned, if not then original 
     * value is returned instead.
     * @param key key (attribute) of Character, like 'id' or 'name'
     */
    public getValue( key: keyof Character ): string | number {
        if ( this.state.editedCharacter[key] !== undefined ) {
            return this.state.editedCharacter[key];
        } else {
            return this.props.character[key];
        }
    }

    /**
     * Updates values in editedCharacter state
     * @param key key (attribute) of Character, like 'id' or 'name'
     * @param value new value
     */
    public actionUpdateValue( key: keyof Character , value: any ): void {
        this.setState( prevState => {
            return {
                editedCharacter: Object.assign( prevState.editedCharacter , { [key]: value } ) ,
            };
        } );
    }

    /**
     * Handles clicking on save button
     */
    public async actionSave(): Promise<void> {
        // pass full Character object to parent component,
        // merging original object with edited values.
        this.props.onSaved( Object.assign( this.props.character , this.state.editedCharacter ) );
    }

}