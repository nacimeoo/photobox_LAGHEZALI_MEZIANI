import Handlebars from 'handlebars';
import { Categorie, Photo, Commentaire  } from './types';

const BASE_URL = "https://webetu.iutnc.univ-lorraine.fr";


export function displayPicture(data: Photo): void {
    const templateScript = document.getElementById('photoTemplate') as HTMLElement;
    const template = Handlebars.compile(templateScript.innerHTML);

    const html = template({
        title: data.photo.titre,
        description: data.photo.descr,
        type: data.photo.format,
        defX: data.photo.width,
        defY: data.photo.height,
        url: BASE_URL + data.photo.thumbnail.href,
    });

    const section = document.getElementById('la_photo') as HTMLElement;
    section.innerHTML = html;
}

export function displayCategorie(data: Categorie): void {
    const el = document.getElementById('la_categorie') as HTMLElement;
    el.textContent = `categorie : ${data.categorie.nom}`;
}

export function displayComments(data: Commentaire[]): void {
    const ul = document.getElementById('les_commentaires') as HTMLElement;
    ul.innerHTML = '';
    data.forEach((c: Commentaire) => {
        const li = document.createElement('li');
        li.textContent = `${c.pseudo} : ${c.content}`;
        ul.appendChild(li);
    });
}