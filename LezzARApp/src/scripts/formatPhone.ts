export const getFormatPhone = ( phoneno:string) => {

    return `${phoneno.slice(0,3)} (${phoneno.slice(3,6)}) ${phoneno.slice(6,9)} ${phoneno.slice(9,11)} ${phoneno.slice(11,13)}`
};