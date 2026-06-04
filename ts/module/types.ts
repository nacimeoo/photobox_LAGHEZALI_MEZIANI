export interface Photo {
    type: string;
    photo: {
        thumbnail: any;
        id: number;
        titre: string;
        descr: string;
        file: string;
        format: string;
        height: number;
        width: number;
        size: number;
        type: string;
        url: { href: string };
    };
    links: {
        categorie: { href: string };
        comments: { href: string };
    };
}


export interface Categorie {
    categorie: {
        nom: any;
        id: number;
        titre: string;
    };
}

export interface Commentaire {
    pseudo: string;
    content: string;
}

export interface Comments {
    comments: Commentaire[];
}