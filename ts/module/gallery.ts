import { loadPicture, loadRessource } from './photoloader';
import { API_URL} from './config';

let listPhotos = null;

export function load(): Promise<any> {
    return loadRessource('/www/canals5/phox/api/photos')
        .then((data) => {
            listPhotos = data.photos;
            return listPhotos;
        })
}