import { Photo } from "./types";
import { displayPicture } from "./ui";

const BASE_URL = "https://webetu.iutnc.univ-lorraine.fr";


export function display_galerie(galerie: Photo[], onphotoClick: (id: number) => void): void {
    const section = document.getElementById('la_galerie') as HTMLElement;
    section.innerHTML = '';

    galerie.forEach((photo: Photo) => {
        const img = document.createElement('img');
        img.src = `${BASE_URL}${photo.photo.thumbnail.href}`;
        img.setAttribute('data-photoId', photo.photo.id.toString());

        img.addEventListener('click', () => {
            onphotoClick(photo.photo.id);
        });
        section.appendChild(img);
    });
}
