//import axios from "axios";

//axios.defaults.headers.common["x-api-key"] = "live_1tuo6caBJuiJmfc1XpTmIRJu5lZyliM8nxubNmqyOPNq8Ayb2drpi1nkc7pt4Xo2";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
let catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => makeOptions(data))
  .catch(err => {
    Notiflix.Notify.failure(err.message);
    errorEl.classList.remove('hidden');
  })
  .finally(() => loader.classList.add('hidden'));

function makeOptions(items) {
  let listOptions = items.map(item => {
    let cat = document.createElement('option');
    cat.setAttribute('value', item.id);
    cat.textContent = item.name;

    return cat;
  });
  //console.log(listOptions);
  errorEl.classList.add('hidden');
  select.append(...listOptions);
  select.classList.remove('hidden');
}

select.addEventListener('change', changeValue);

function changeValue(event) {
  loader.classList.remove('hidden');
  catInfo.innerHTML = '';
  errorEl.classList.add('hidden');
  fetchCatByBreed(event.target.value)
    .then(data => createMarkup(data))
    .catch(err => {
      Notiflix.Notify.failure(err.message);
      errorEl.classList.remove('hidden');
    })
    .finally(() => loader.classList.add('hidden'));
}

function createMarkup(cat) {
  const url = cat[0].url;
  const { name, temperament, description } = cat[0].breeds[0];
  const markup = `<img width='300' src='${url}'/><div class='description'>
    <h1 class='name'>${name}</h1><p>${description}</p>
    <p class='temperament'><b>Temperament: </b>${temperament}</p></div>`;
  catInfo.innerHTML = markup;
}