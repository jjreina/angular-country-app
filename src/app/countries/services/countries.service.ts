import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountrieService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.loadToLocalStorage();
  }

  private saveToLocalStorage = () => {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  };

  private loadToLocalStorage = () => {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  };

  private getCountriesRequest = (url: string): Observable<Country[]> => {
    return this.httpClient.get<Country[]>(url).pipe(catchError(() => of([])));
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
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) => (this.cacheStore.byCapital = { term: query, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  };

  public searchCountry = (query: string): Observable<Country[]> => {
    const url: string = `${this.apiUrl}/name/${query}`;
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) => (this.cacheStore.byCountry = { term: query, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  };

  public searchRegion = (region: Region): Observable<Country[]> => {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorage())
    );
  };
}
