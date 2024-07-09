import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountrieService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest = (url: string): Observable<Country[]> => {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => of([])),
      delay(2000)
    );
  };

  public searchCountryByAlphaCode = (
    code: string
  ): Observable<Country | null> => {
    const url: string = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  };

  public searchCapital = (query: string): Observable<Country[]> => {
    const url: string = `${this.apiUrl}/capital/${query}`;
    return this.getCountriesRequest(url);
  };

  public searchCountry = (query: string): Observable<Country[]> => {
    const url: string = `${this.apiUrl}/name/${query}`;
    return this.getCountriesRequest(url);
  };

  public searchRegion = (region: string): Observable<Country[]> => {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url);
  };
}
