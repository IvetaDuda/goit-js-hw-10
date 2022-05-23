const URL = `https://restcountries.com/v2/name`;
export default function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=name,capital,population,flags,languages`).then(response => {
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json();
  });
}
