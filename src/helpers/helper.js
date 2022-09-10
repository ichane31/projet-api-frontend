export function numFormatter(num) {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 1000) {
        return num; // if value < 1000, nothing to do
    }
};


export const getItemFromStorage = (key) => {
    const item = window.localStorage.getItem(key);
    if (item === undefined){
       return null;
    }
       return  JSON.parse(item)
};

export const setItemInStorage = (name, data) => {
    window.localStorage.setItem(name, JSON.stringify(data));
};

export const removeItemFromStorage = (name) => {
    window.localStorage.removeItem(name);
};