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

export async function PostNote(id , newNote) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}`, newNote);
}

export async function PutNote(id, modifieNote) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}`, modifieNote);
}

export async function DelNote(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/note/${id}`,  { method: 'DELETE'});
}