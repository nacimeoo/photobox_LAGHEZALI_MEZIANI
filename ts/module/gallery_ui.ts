import { Photo } from "./types";
import { displayPicture } from "./ui";

const BASE_URL = "https://webetu.iutnc.univ-lorraine.fr";


export function display_galerie(galerie: Photo[]): void {
    const section = document.getElementById('la_galerie') as HTMLElement;
    section.innerHTML = '';

    galerie.forEach((photo: Photo) => {
        const img = document.createElement('img');
        img.src = `${BASE_URL}${photo.photo.thumbnail.href}`;
        img.setAttribute('data-photoId', photo.photo.id.toString());
        section.appendChild(img);
    });
}
