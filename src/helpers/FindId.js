export const findIdCategory = (name, categories) => {
    const _category =  categories.filter(item => (
        item.name === name
    ));
    if(_category.length) return _category[0].id
}

