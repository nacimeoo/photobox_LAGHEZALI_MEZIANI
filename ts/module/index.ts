import { load } from './gallery';
import { display_galerie } from './gallery_ui';
import { loadPicture, loadRessource } from './photoloader';
import { Categorie, Photo } from './types';
import { displayCategorie, displayComments, displayPicture } from './ui';

function getPicture(id: number): void {
    loadPicture(id)
        .then((data: Photo) => {
            displayPicture(data);

            getCategorie(data)
                .then((cat: any) => {
                    displayCategorie(cat);
                });

            getComments(data)
                .then((result: any) => {
                    displayComments(result.comments);
                });

        })
        .catch(err => console.error(err.message));
}

function getCategorie(data: Photo): Promise<any> {
    const uri = data.links.categorie.href;
    return loadRessource(uri);
}

function getComments(data: Photo): Promise<any> {
    const uri = data.links.comments.href;
    return loadRessource(uri);
}

const btnLoad = document.getElementById('btn-load') as HTMLButtonElement;
btnLoad.addEventListener('click', () => {
    load().then((galerie: any) => display_galerie(galerie));
});


const hash = window.location.hash;
const id = hash ? parseInt(hash.substring(1)) : 105;

getPicture(id);