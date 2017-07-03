/**
 * Jazzy-Frontend
 * 
 * This file contains several useful interfaces used across whole project.
 */

// a type of character, either a gnome or troll (?)
export type CharacterType = 'gnomes' | 'trolls';

// shape of single character
export interface Character {
    id: number ,
    name: string ,
    age: number ,
    strenght: number ,   
}
