// Define the country data from the API
export interface Country {
  name: {
    common?: string;
    official?: string;
    nativeName?: Record<string, { common?: string; official?: string}>
  }
  flags: { svg: string};
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  cca3: string;
}