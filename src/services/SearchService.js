const header = new Headers({
    'Accept': 'application/json'
});

export async function PostSearchResults(search) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/search' , search);
}

export async function GetSearchResults(q) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/search?q=${q}` );
    const results = await response.json();
    return results;
}
export async function PostSearchProjets(search) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/search/projet' , search);
}
export async function GetSearchProjets(q) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/search/projet?q=${q}` );
    const projets = await response.json();
    return projets;
}
export async function PostSearchCategories(search) {
    return await fetch('https://projet-apis.herokuapp.com/api/v1/search/category' , search);
}
export async function GetSearchCategorys(q) {
    const response = await fetch(`https://projet-apis.herokuapp.com/api/v1/search/category?q=${q}` );
    const categories = await response.json();
    return categories;
}