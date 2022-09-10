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

export async function PostProjet(newProjet , token) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/projet', newProjet ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function PutProjet(id, modifieProjet, token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}`, modifieProjet ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function DelProjet(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}` 
    } }, { method: 'DELETE'});
}

export async function FavProjet(id, token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}/favorite` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function UnFavProjet(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}/unfavorite` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function LatestsProjets(count) {
    const response =  await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/latest/${count}`);
    const projets = await response.json();
    return projets;
}

export async function FavoriteProjets(count ,token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/favorites/${count}` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function SuggestionsProjets(count , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/suggestions/${count}` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}