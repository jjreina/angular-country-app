import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountrieService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private countrieService: CountrieService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.countrieService.searchCountryByAlphaCode(id).subscribe((country) => {
        console.log(country);
      });
    });
  }
}
