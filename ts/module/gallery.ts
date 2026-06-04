import { loadPicture, loadRessource } from './photoloader';

let listPhotos: any = null;
let navigation: any = {};

export function loadPage(uri: string): Promise<any> {
    return loadRessource(uri)
        .then((data) => {
            listPhotos = data.photos;
            navigation = data.links;
            return listPhotos;
        })
}

export function load(): Promise<any> {
    return loadPage('/www/canals5/phox/api/photos')
}

export function next(): Promise<any> {
    if (navigation && navigation.next) {
        return loadPage(navigation.next.href);
    }
    return Promise.reject(new Error("No next page available"));
}

export function previous(): Promise<any> {
    if (navigation && navigation.prev) {
        return loadPage(navigation.prev.href);
    }
    return Promise.reject(new Error("No previous page available"));
}

export function first(): Promise<any> {
    if (navigation && navigation.first) {
        return loadPage(navigation.first.href);
    }
    return Promise.reject(new Error("No first page available"));
}

export function last(): Promise<any> {
    if (navigation && navigation.last) {
        return loadPage(navigation.last.href);
    }
    return Promise.reject(new Error("No last page available"));
}

export function getNextPhoto(id: number): number | null {
    if(!listPhotos) return null;
    const index = listPhotos.findIndex((photo: any) => photo.photo.id === id);
    if (index !== -1 && index < listPhotos.length - 1) {
        return listPhotos[index + 1].photo.id;
    }
    return null;
}

export function getPreviousPhoto(id: number): number | null {
    if(!listPhotos) return null;
    const index = listPhotos.findIndex((photo: any) => photo.photo.id === id);
    if (index > 0) {
        return listPhotos[index - 1].photo.id;
    }
    return null;
}