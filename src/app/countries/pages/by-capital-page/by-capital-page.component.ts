import { Component, OnDestroy, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountrieService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public term: string = '';

  constructor(private countriesService: CountrieService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.term = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital = (term: string): void => {
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  };
}
