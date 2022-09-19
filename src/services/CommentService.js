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

export async function PostComment(id,newComment ) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}`, newComment, );
}

export async function PutComment(id, modifieComment ) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}`, modifieComment );
}

export async function DelComment(id , token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}` ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } , method: 'DELETE'});
}

export async function PostReplyComment(id ,newReply) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/Reply`, newReply );
}

export async function GetReplyByComment(id) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/Replieslist`);
    const replies = await response.json();
    return replies;
}

export async function LikeComment(id ,token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/like`, { method: 'POST', headers: {"Authorization": "Bearer " +token}} );
}

export async function UnLikeComment(id , token ) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/comment/${id}/dislike` , {method: 'DELETE' , headers: {"Authorization": "Bearer " +token}} ); 
}
