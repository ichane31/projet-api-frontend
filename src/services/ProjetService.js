const header = new Headers({
    'Accept': 'application/json'
});

export async function GetProjets() {
    const response = await fetch('https://projet-apis.herokuapp.com/api/v1/projet');
    const projets = await response.json();
    return projets;
}


export async function GetProjetsById(id) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}`);
    const projet = await response.json();
    return projet;
}

export async function GetProjetsByUser(id) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}/list`);
    const projets = await response.json();
    return projets;
}

export async function PostProjet(newProjet) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/projet', newProjet);
}

export async function PutProjet(id, modifieProjet) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}`, modifieProjet);
}

export async function DelProjet(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}`,  { method: 'DELETE'});
}

export async function FavProjet(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}/favorite`);
}

export async function UnFavProjet(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}/unfavorite`);
}

export async function LatestsProjets(count) {
    const response =  await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/latest/${count}`);
    const projets = await response.json();
    return projets;
}

export async function FavoriteProjets(count) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/favorites/${count}`);
}

export async function SuggestionsProjets(count) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/suggestions/${count}`);
}