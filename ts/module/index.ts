import { load, last, first, previous, next, getNextPhoto, getPreviousPhoto } from './gallery';
import { display_galerie } from './gallery_ui';
import { loadPicture, loadRessource } from './photoloader';
import { Photo } from './types';
import { displayCategorie, displayComments, displayPicture } from './ui';

const btnNext = document.getElementById('btn-next') as HTMLButtonElement;
const btnPrevious = document.getElementById('btn-prev') as HTMLButtonElement;
const btnFirst = document.getElementById('btn-first') as HTMLButtonElement;
const btnLast = document.getElementById('btn-last') as HTMLButtonElement;
const btnLoad = document.getElementById('btn-load') as HTMLButtonElement;

if (btnNext) {
    btnNext.addEventListener('click', () => {
        next().then((galerie: any) => display_galerie(galerie, getPicture));
    });
}

if (btnPrevious) {
    btnPrevious.addEventListener('click', () => {
        previous().then((galerie: any) => display_galerie(galerie, getPicture));
    });
}

if (btnFirst) {
    btnFirst.addEventListener('click', () => {
        first().then((galerie: any) => display_galerie(galerie, getPicture));
    });
}

if (btnLast) {
    btnLast.addEventListener('click', () => {
        last().then((galerie: any) => display_galerie(galerie, getPicture));
    });
}

function getPicture(id: number): void {
    loadPicture(id)
        .then((data: Photo) => {
            displayPicture(data);

            const sectionGalerie = document.getElementById('la_galerie') as HTMLElement;
            const sectionPhoto = document.getElementById('la_photo') as HTMLElement;
            const navigationButtons = document.getElementById('navigation') as HTMLElement;

            if (sectionGalerie) sectionGalerie.style.display = 'none';
            if (sectionPhoto) sectionPhoto.style.display = 'block';
            if (navigationButtons) navigationButtons.style.display = 'none';

            document.getElementById('close-lightbox')?.addEventListener('click', () => {
                if (sectionGalerie) sectionGalerie.style.display = 'block';
                if (sectionPhoto) sectionPhoto.style.display = 'none';
                if (navigationButtons) navigationButtons.style.display = 'block';
            }
            );

            document.getElementById('next-lightbox')?.addEventListener('click', () => {
                const nextId = getNextPhoto(data.photo.id);
                if (nextId !== null) {
                    getPicture(nextId);
                }
            });

            document.getElementById('prev-lightbox')?.addEventListener('click', () => {
                const prevId = getPreviousPhoto(data.photo.id);
                if (prevId !== null) {
                    getPicture(prevId);
                }
            });

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

btnLoad.addEventListener('click', () => {
    load().then((galerie: any) => display_galerie(galerie, getPicture));
});


const hash = window.location.hash;
const id = hash ? parseInt(hash.substring(1)) : 105;

getPicture(id);