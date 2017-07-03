
import { Character, CharacterType } from '../support/types';

interface QueryParams {
    limit: number;
    offset: number;
}

function wait( ms: number ): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve , ms ) );
}

export async function loadCharactersOfType( characterType: CharacterType , queryParams: QueryParams ): Promise<Character[]> {

    await wait( 250 );

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
