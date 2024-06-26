export interface ICountryInfo {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
}

export interface ICovidResponse {
    updated: number;
    country: string;
    countryInfo: ICountryInfo;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: string;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
};

export interface IBookMark {
    lng: string;
    lat: string;
}

export enum modeOptions {
    avg,
    num,
}
