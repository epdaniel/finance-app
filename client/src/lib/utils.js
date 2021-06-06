
export function formatDate(date){
    let dateObj = new Date(date)
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return dateObj.toLocaleDateString("en-IL", options);
};