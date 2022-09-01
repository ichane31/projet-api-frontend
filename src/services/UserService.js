export async function GetUsers() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user');
}

export async function GetMe() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me');
}

export async function PutMe(modifieMe) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me', modifieMe);
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

export async function ResetPassword() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/resetpassword');
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

export async function GetUser(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/${id}` );
}

export async function GelUser(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/${id}` , {method: 'DELETE'} );
}

export async function LoginUser(user) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/login` , user);
}

export async function Logout() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/logout');
}

export async function GetMeDetails() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me/details');
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

export async function GetMeDevice() {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/user/me/device');
}
export async function DelMeDevice(id) {
    return await fetch(`https://projet-apis.herokuapp.com/api/v1/user/me/device/${id}` , {method: 'DELETE'});
}
