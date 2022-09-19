const header = new Headers({
    'Accept': 'application/json'
});
export async function PostContact( newContact ) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/contact/', newContact );
}