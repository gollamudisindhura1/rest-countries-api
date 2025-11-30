export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    svg: string;
    png?: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  tld?: string[];
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  cca3: string;
}