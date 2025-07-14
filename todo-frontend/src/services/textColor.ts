export const textColorCalc = (color: string) => {
    if (!color.match(/^#([0-9a-fA-F]{6})$/)) return '#ffffff';
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const average = (r + g + b) / 3;
    return average > 127 ? '#000000' : '#ffffff';
}