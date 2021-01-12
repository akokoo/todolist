export function generateId() {
    let id = '',
        words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
        randomNum;
    while (id.length < 15) {
        randomNum = Math.floor(Math.random() * words.length);
        id += words[randomNum];
    }
    return id;
}