export const getRandomNum = () => {
    let num = Math.random() * 1000000;
    return Math.floor(num);
}

const K = 1024;
const M = 1048576;
const G = 1073741824;


export const getFileSizeStr = (size) => {

    if (size >= K && size < M) {
        return (size / K).toFixed(2) + "KB";
    } else if (size >= M && size < G) {
        return (size / M).toFixed(2) + "MB";
    } else if (size >= G) {
        return (size / G).toFixed(2) + "GB";
    } else {
        return size + "B"
    }


}