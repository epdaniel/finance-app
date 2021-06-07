
export function formatDate(date){
    const dateObj = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const locale = navigator.languages.length > 0 ? navigator.languages[0] : 'en';
    return dateObj.toLocaleDateString(locale, options);
};