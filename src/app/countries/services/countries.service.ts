import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountrieService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/capital/${query}`)
      .pipe(catchError(() => of([])));
  };

  public searchCountry = (query: string): Observable<Country[]> => {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/name/${query}`)
      .pipe(catchError(() => of([])));
  };

  public searchRegion = (region: string): Observable<Country[]> => {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/region/${region}`)
      .pipe(catchError(() => of([])));
  };
}
