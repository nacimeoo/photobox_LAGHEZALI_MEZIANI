import { API_URL} from './config';

export function loadPicture(idPicture: number): Promise<any> {
    const url = `${API_URL}/photos/${idPicture}`;
    return fetch(url, { credentials: 'include' }) 
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(`Impossible de charger la photo ${idPicture} :`, error.message);
            throw error; 
        });
}

export function loadRessource(uri: string): Promise<any> {
    const BASE_URL = "https://webetu.iutnc.univ-lorraine.fr";
    const url = `${BASE_URL}${uri}`;
    return fetch(url, { credentials: 'include' }) 
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }
            return response.json();
        } )
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(`Impossible de charger la ressource ${uri} :`, error.message);
            throw error; 
        });
}