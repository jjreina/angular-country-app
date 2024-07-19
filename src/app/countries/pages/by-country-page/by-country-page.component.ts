import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountrieService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public term: string = '';

  constructor(private countriesService: CountrieService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.term = this.countriesService.cacheStore.byCountry.term;
  }

  searchByCountry = (term: string): void => {
    this.isLoading = true;
    this.countriesService.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  };
}
