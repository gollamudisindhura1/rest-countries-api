export interface CountryData {
    name: {
        common: string;
        official?: string;
        nativeName?: Record<string, {
            common?: string;
            official?: string;
        }>;
    };
    flags: {
        svg: string;
        png?: string;
    };
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, {
        name: string;
    }>;
    languages?: Record<string, string>;
    borders?: string[];
    cca3: string;
}
export declare class Country {
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subRegion: string;
    capital: string;
    topLevelDomain: string;
    currencies: string;
    languages: string;
    borders: string[];
    flag: string;
    flags: any;
    constructor(name: string, nativeName: string, population: number, region: string, subRegion: string, capital: string, topLevelDomain: string, currencies: string, languages: string, borders: string[], flag: string);
    static fromApi(data: CountryData): Country;
}
//# sourceMappingURL=Country.d.ts.map