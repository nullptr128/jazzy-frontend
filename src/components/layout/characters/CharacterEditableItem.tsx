
import * as React from 'react';
import { Character } from '../../../support/types';
import Avatar from '../../widget/Avatar';
import TextInput from '../../widget/TextInput';
import Button from '../../widget/Button';
import Loader from '../../widget/Loader';

interface CharacterEditableItemProps {
    character: Character;
    isSaving: boolean;
    onSaved: (editedCharacter: Character) => Promise<void>;
}

interface CharacterEditableItemState {
    editedCharacter: Partial<Character>;
}

export default class CharacterEditableItem extends React.Component<CharacterEditableItemProps,CharacterEditableItemState> {

    public state = {
        editedCharacter: {} ,
    };

    public getEditGroupString( label: string , key: keyof Character ): JSX.Element {
        return (
            <div className="character-item-edit-group">
                <label>{ label }</label>
                <TextInput type="text" value={ this.getValue( key ) }
                    onChange={ value => this.actionUpdateValue( key , value ) }/>
            </div>
        );  
    }

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

    public getValue( key: keyof Character ): string | number {
        if ( this.state.editedCharacter[key] !== undefined ) {
            return this.state.editedCharacter[key];
        } else {
            return this.props.character[key];
        }
    }

    public actionUpdateValue( key: keyof Character , value: any ): void {
        this.setState( prevState => {
            return {
                editedCharacter: Object.assign( prevState.editedCharacter , { [key]: value } ) ,
            };
        } );
    }

    public async actionSave(): Promise<void> {
        this.props.onSaved( Object.assign( this.props.character , this.state.editedCharacter ) );
    }

}