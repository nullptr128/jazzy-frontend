/**
 * Jazzy-Frontend
 * 
 * This service helps with managing characters on server
 * via Rest API.
 */

import { Character, CharacterType } from '../support/types';

// shape of query parameters
interface QueryParams {
    limit: number;
    offset: number;
}

// helper function, "sleeps" in async/await world
function wait( ms: number ): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve , ms ) );
}

/**
 * Loads characters of particular type with filters.
 * @param characterType type of character you want to load
 * @param queryParams limit/offset filters.
 * @return array of characters
 */
export async function loadCharactersOfType( characterType: CharacterType , queryParams: QueryParams ): Promise<Character[]> {
    
    // uncomment this to set 3 seconds delay on GET request, for
    // checking how loader looks
    //await wait( 3*1000 );

    // for now, only "gnomes" tab is supported
    switch ( characterType ) {
        case 'gnomes':
            return await loadGnomes( queryParams );

        default:
            return [];

    }

}

/**
 * Loads gnomes from backend using filters.
 * @param queryParams limit/offset filters.
 */
export function loadGnomes( queryParams: QueryParams ): Promise<Character[]> {
    return new Promise<Character[]>( async (resolve,reject) => {

        const url: string = `http://master.datasource.jazzy-hr.jzapp.io/api/v1/gnomes?limit=${queryParams.limit}&offset=${queryParams.offset}`;
        const options: RequestInit = {
            method: 'GET' ,            
        };

        try {
            const response = await fetch( url , options );
            resolve( await response.json() );
        } catch ( err ) {
            reject( err );
        }

    } );
}

/**
 * Updates character with particular ID on backend.
 * @param characterType type of character you want to update
 * @param characterId id of character
 * @param updateData object with values to update
 * @return edited character
 */
export function updateCharacterOfType( characterType: CharacterType , characterId: number , updateData: Character ): Promise<Character> {
    return new Promise<Character>( async (resolve,reject) => {

        const url: string = `http://master.datasource.jazzy-hr.jzapp.io/api/v1/gnomes/${characterId}`;
        const options: RequestInit = {
            method: 'PATCH' ,
            body: JSON.stringify( updateData ) ,
        };

        try {
            const response = await fetch( url , options );
            if ( response.status == 200 ) {
                resolve( await response.json() );
            } else {
                reject( new Error( 'HTTP error code ' + response.status ) );
            }
        } catch ( err ) {
            reject( err );
        }

    } );
}
