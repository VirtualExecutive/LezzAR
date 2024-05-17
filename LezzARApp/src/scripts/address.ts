interface Address {
    accountID: number;
    addressID: number;
    sehirID: number;
    ilceID: number;
    mahalleID: number;
    sehir: string;
    ilce: string;
    mahalle: string;
    caddeSokak: string;
    kat:string;
    binaNo: string;
    binaAdi: string;
    adresTarifi: string;
    title: string;
    enlem: number;
    boylam: number;
}

interface LocalAddress {
    addressID: number;
    sehirID: number;
    ilceID: number;
    mahalleID: number;
    sehir: string;
    ilce: string;
    mahalle: string;
    caddeSokak: string;
    kat:string;
    binaNo: string;
    binaAdi: string;
    adresTarifi: string;
    title: string;
    enlem: number;
    boylam: number;
}