/**
 * Jazzy-Frontend
 * 
 * Component representing a character that we are 
 * not currently editing.
 */

import * as React from 'react';
import { Character } from '../../../support/types';
import Avatar from '../../widget/Avatar';
import Gauge from '../../widget/Gauge';

interface CharacterItemProps {
    character: Character;
    onEditItem: () => void;
}

export default class CharacterItem extends React.Component<CharacterItemProps,{}> {

    /**
     * Prepare avatar part
     */
    public getAvatarElement(): JSX.Element {
        return (
            <div className="character-item-avatar">
                <Avatar url="img/character-avatar.png"/>
            </div>
        );
    }

    /**
     * Prepare name/age part
     */
    public getDescriptionElement(): JSX.Element {
        return (
            <div className="character-item-description">
                <div className="character-item-name">
                    { this.props.character.name }
                </div>
                <div className="character-item-age">
                    Age: { this.props.character.age }
                </div>
            </div>
        );
    }

    /**
     * Prepare strength part, with number and gauge.
     */
    public getStrengthElement(): JSX.Element {
        return (
            <div className="character-item-strength">
                <div className="character-item-strength-bar">
                    <Gauge value={ this.props.character.strenght } total={ 100 }/>
                </div>
                <div className="character-item-strength-value">
                    { this.props.character.strenght } / 100
                </div>
                <div className="character-item-strength-label">
                    Strength
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        return (
            <li className="character-item" onClick={ () => this.props.onEditItem() }>
                { this.getAvatarElement() }
                { this.getDescriptionElement() }
                { this.getStrengthElement() }
            </li>
        );
    }

}
