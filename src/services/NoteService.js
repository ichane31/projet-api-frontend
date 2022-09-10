const header = new Headers({
    'Accept': 'application/json'
});

export async function GetNoteByProjet(id) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}/list`);
    const notes = await response.json();
    return notes;
}

export async function GetNote(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}`);
}

export async function PostNote(id , newNote ,token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}`, newNote ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function PutNote(id, modifieNote , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}`, modifieNote ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function DelNote(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } },  { method: 'DELETE'});
}