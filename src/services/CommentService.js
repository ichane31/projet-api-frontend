const header = new Headers({
    'Accept': 'application/json'
});

export async function GetComments() {
    const response = await fetch('https://projet-apis.herokuapp.com/api/v1/comment');
    const categories = await response.json();
    return categories;
}

export async function GetCommentByProjet(id) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/list`);
    const comments = await response.json();
    return comments;
}

export async function GetCommentParentByProjet(id) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/Parentlist`);
    const comments = await response.json();
    return comments;
}

export async function GetComment(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}`);
}

export async function PostComment(id,newComment , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}`, newComment ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function PutComment(id, modifieComment ,token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}`, modifieComment ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function DelComment(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } },  { method: 'DELETE'});
}

export async function PostReplyComment(id ,newReply, token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/reply`, newReply ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function GetReplyByComment(id) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/Replieslist`);
    const replies = await response.json();
    return replies;
}

export async function LikeComment(id , token ) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/like` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function UnLikeComment(id ,token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/dislike` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } } );
}
