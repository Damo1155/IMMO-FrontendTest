export function DistinctBy<T> (key: keyof T, array: Array<T>): Array<T> {
    const keys = array.map(value => value[key]);
    return array.filter((value, index) => keys.indexOf(value[key]) === index);
}