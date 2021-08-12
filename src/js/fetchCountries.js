
import '../css/style';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import countryTmpl from '../templates/country-card.hbs';
import countryOneTmpl from '../templates/onecard-country.hbs';
import API from './api-service';
import getRefs from './get-refs';
const ref = getRefs();

var debounce = require('lodash.debounce');


ref.input.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {

   const searchQuery = e.target.value;
  API.fetchCountries(searchQuery)
      .then(countries => {
      if (countries.length === 1) {
            renderShowCountry(countries,  countryOneTmpl,  ref.countryInfo);
            clearCountries(ref.countryList)
            e.target.value = '';
}
         else if (countries.length >=2 && countries.length<= 10) {
            renderShowCountry(countries, countryTmpl,  ref.countryList);
             clearCountries(ref.countryInfo)
         
}
          else  if (countries.length > 10) {
            error({
               text: "Too many matches found!",
               delay: 500,
            });
      } else if (countries.status === 404) {
        
            error({
               text: "Not found",
               delay: 500,
            });
         ref.input.value = '';
         }
          console.log(countries)
      }
      )
      .catch(error => console.log(error));

}
    

   function renderShowCountry(countries, wrapper, place) {
   const markup = countries.map(country => wrapper(country)).join('');
 return place.innerHTML= markup
}

function clearCountries(place) {
   place.innerHTML = '';
}
