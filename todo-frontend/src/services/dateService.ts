

// export const formatDate = (date: Date): string => {
//     const pad = (n: number) => String(n).padStart(2, '0');

//     const year = date.getFullYear();
//     const month = pad(date.getMonth() + 1);
//     const day = pad(date.getDate());
//     const hours = pad(date.getHours());
//     const minutes = pad(date.getMinutes());
//     const seconds = pad(date.getSeconds());

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// };

export const formatDate = (date: Date): string => {
    const pad = (n: number, width: number = 2) => String(n).padStart(width, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const millis = pad(date.getMilliseconds(), 3);
    const micros = `${millis}000`;

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${micros}`;
};