export async function GetUsers() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user');
}

export async function GetMe(token) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me', {
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function PutMe(modifieMe ) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me', modifieMe );
}

export async function PutMePassword(modifie ) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me/password', modifie );
}

export async function PostRegisterUser(newUser) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user' , newUser);
}

export async function GetActiveUsers() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/active' );
}

export async function GetJoinedUsers() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/joined' );
}

export async function VerifyEmail(token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/verify/${token}`);
}

export async function ResetPassword(body) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/resetpassword',body );
}

export async function GetResetPasswordToken(token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/resetpassword/${token}`);
}

export async function PostResetPasswordToken(token , user) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/resetpassword/${token}` , user);
}

export async function ChangeEmail(token ) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/resetpassword/${token}` );
}

export async function GetUser(id, token) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/${id}` ,{
        headers: {
            'Authorization': `Bearer ${token}` 
        } })
}

export async function DelUser(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/${id}` , {method: 'DELETE'} );
}

export async function LoginUser(user) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/login` , user);
}

export async function Logout(token) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/logout' , {method: 'POST' , headers: {"Authorization": "Bearer " +token}});
}

export async function GetMeDetails(token) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me/details' ,{
    headers: {
        'Authorization': `Bearer ${token}` 
    } });
}

export async function PromoteUser(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/${id}/promote`);
}

export async function DemoteUser(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/${id}/demote`);
}

export async function GetRoleAdmin() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/role/admin');
}

export async function GetRoleUser() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/role/user');
}

export async function DelAccount(pass) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/Account/me',pass );
}


