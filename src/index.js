import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries';
import countryDetailed from './js/templates/countryDetailed.hbs';
import listCountry from './js/templates/listCountry.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countrylist = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
  event.preventDefault();
  const value = event.target.value.trim();
  countryInfo.innerHTML = '';
  countrylist.innerHTML = '';
  if (value !== '') {
    onMurkupList(value);
  }
}

function onMurkupList(event) {
  fetchCountries(event)
    .then(countries => {
      let country = countries.length;
      if (country > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (country > 1 && country <= 10) {
        const murkupList = countries.map(listCountry).join('');
        countrylist.insertAdjacentHTML('beforeend', murkupList);
      }
      if (country === 1) {
        const murkupLDetailed = countries.map(countryDetailed).join('');
        countrylist.insertAdjacentHTML('beforeend', murkupLDetailed);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}
