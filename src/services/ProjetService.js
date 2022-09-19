const header = new Headers({
    'Accept': 'application/json'
});



export async function GetProjets() {
    const response = await fetch('https://projet-apis.herokuapp.com/api/v1/projet');
    const projets = await response.json();
    return projets;
}



export async function GetProjetId(id) {
    const response= await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}` );
    const projets = await response.json();
    return projets;
     
 }


export async function GetProjetsById(id) {
   return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}` ,);
    
}

export async function GetProjetsByUser(token) {
    const response = await fetch('https://projet-apis.herokuapp.com/api/v1/projet/user/Projetlist' ,{ headers: {"Authorization": "Bearer " +token}});
    const projets = await response.json();
    return projets;
}

export async function PostProjet(newProjet ) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/projet', newProjet );
}

export async function PutProjet(id, modifieProjet) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}`, modifieProjet );
}

export async function DelProjet(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}`, {
    headers: new Headers( {
        'Authorization': `Bearer ${token}` 
    }) }, { method: 'DELETE'});
}

export async function FavProjet(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}/favorite`,{ method: 'POST', headers: {"Authorization": "Bearer " +token}} );
}

export async function UnFavProjet(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/${id}/unfavorite` ,{ method: 'DELETE', headers: {"Authorization": "Bearer " +token}} );
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

export async function AllFavoriteProjets(token) {
    const response = await fetch('https://projet-apis.herokuapp.com/api/v1/projet/user/favorites/' ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
    const projets = await response.json();
    return projets;
}

export async function SuggestionsProjets(count , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/projet/suggestions/${count}` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}