
import { Character, CharacterType } from '../support/types';

interface QueryParams {
    limit: number;
    offset: number;
}

function wait( ms: number ): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve , ms ) );
}

export async function loadCharactersOfType( characterType: CharacterType , queryParams: QueryParams ): Promise<Character[]> {
    
    //await wait( 3*1000 );

    switch ( characterType ) {
        case 'gnomes':
            return await loadGnomes( queryParams );

        default:
            return [];

    }

}

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
