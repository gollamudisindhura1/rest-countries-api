"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
class Country {
    name;
    nativeName;
    population;
    region;
    subRegion;
    capital;
    topLevelDomain;
    currencies;
    languages;
    borders;
    flag;
    flags;
    constructor(name, nativeName, population, region, subRegion, capital, topLevelDomain, currencies, languages, borders, flag) {
        this.name = name;
        this.nativeName = nativeName;
        this.population = population;
        this.region = region;
        this.subRegion = subRegion;
        this.capital = capital;
        this.topLevelDomain = topLevelDomain;
        this.currencies = currencies;
        this.languages = languages;
        this.borders = borders;
        this.flag = flag;
    }
    static fromApi(data) {
        const native = data.name.nativeName
            ? Object.values(data.name.nativeName)[0]?.common || data.name.common
            : data.name.common;
        const currencyList = data.currencies
            ? Object.values(data.currencies).map((c) => c.name).join(", ")
            : "N/A";
        const languageList = data.languages
            ? Object.values(data.languages).join(", ")
            : "N/A";
        return new Country(data.name.common, native, data.population, data.region, data.subregion || "N/A", data.capital?.[0] || "N/A", data.tld?.join(", ") || "N/A", currencyList, languageList, data.borders || [], data.flags.svg);
    }
}
exports.Country = Country;
//# sourceMappingURL=Country.js.map