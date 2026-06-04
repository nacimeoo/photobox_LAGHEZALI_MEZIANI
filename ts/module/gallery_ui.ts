import { Photo } from "./types";
import { displayPicture } from "./ui";

const BASE_URL = "https://webetu.iutnc.univ-lorraine.fr";


export function display_galerie(galerie: Photo[], onphotoClick: (id: number) => void): void {
    const sectionGalerie = document.getElementById('la_galerie') as HTMLElement;
    const sectionPhoto = document.getElementById('la_photo') as HTMLElement;
    const navigationButtons = document.getElementById('navigation') as HTMLElement;

    if (sectionGalerie) sectionGalerie.style.display = 'block';
    if (sectionPhoto) sectionPhoto.style.display = 'none';
    if (navigationButtons) navigationButtons.style.display = 'block';

    sectionGalerie.innerHTML = '';

    galerie.forEach((photo: Photo) => {
        const img = document.createElement('img');
        img.src = `${BASE_URL}${photo.photo.thumbnail.href}`;
        img.setAttribute('data-photoId', photo.photo.id.toString());

        img.addEventListener('click', () => {
            onphotoClick(photo.photo.id);
        });
        sectionGalerie.appendChild(img);
    });
}
