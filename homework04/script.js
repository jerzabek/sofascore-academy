"use strict";

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_CARD_TEMPLATE = document.getElementById('pokemon-card');
const POKEMON_CARD_CONTAINER = document.getElementById('pokemon-container');

// This object keeps track of all important data (cached pokemon, functions to render list and to switch pages...)
var pokemonBrowser = {
  init: function (prevButton, nextButton, unhideButton) {
    // We initialize pagination functionality on the given nodes by adding click event listeners
    this.prevButton = prevButton;
    this.nextButton = nextButton;

    let that = this;

    prevButton.addEventListener('click', () => that.previousPage())
    nextButton.addEventListener('click', () => that.nextPage())
    unhideButton.addEventListener('click', () => that.unhideAll()) // We also initialize the "show all" button to show hidden pokemon

    // We load the first page
    this.loadPage(POKE_API_URL);
  },
  render: function (pokemon) {
    // This function goes over the collection of pokemon names & urls passed as an argument and fetches them from our store (either cache or we call the api & then store in cache)
    let that = this;

    POKEMON_CARD_CONTAINER.replaceChildren([]); // Remove all current children

    pokemon.forEach(function ({ name, url }) {
      that.fetchPokemon(name, url,
        ({ id, name, sprites, height }) => {
          // Successfully fetched a pokemon, now we are rendering it to the user
          let tempPokemon = POKEMON_CARD_TEMPLATE.content.cloneNode(true);

          tempPokemon.querySelector('.card').setAttribute('id', `#pokemon-container-${id}`);
          tempPokemon.querySelector('.card').setAttribute('data-bs-target', `#pokemon-${id}`);
          tempPokemon.querySelector('.card').setAttribute('aria-controls', `pokemon-${id}`);
          tempPokemon.querySelector('.card').setAttribute('alt', name);
          tempPokemon.querySelector('.pokemon-name').innerHTML = name;

          if (sprites.front_default) {
            // If the default icon does not exist we will leave the placeholder image
            tempPokemon.querySelector('.poke-icon').setAttribute('src', sprites.front_default);
          }

          if (that.hidden.includes(url)) {
            // This pokemon has been hidden (this condition occurrs when first rendering the pokemon or when switching pages)
            tempPokemon.querySelector('.card').style.display = 'none';
          }

          tempPokemon.querySelector('.pokemon-hide').onclick = function (e) {
            // When we hide a pokemon we add it to a list of hidden pokemon, and we hide it using css display property.
            if (!that.hidden.includes(url)) {
              document.getElementById(`#pokemon-container-${id}`).style.display = 'none';
              that.hidden.push(url);
            }
          };

          tempPokemon.querySelector('.collapse').setAttribute('id', `pokemon-${id}`);
          tempPokemon.querySelector('.card-body').innerHTML = `This is <b>${name}</b>.<br>Height: <b>${height}</b>`;

          POKEMON_CARD_CONTAINER.appendChild(tempPokemon);
        }, (err) => {
          // When an error occurrs we render some default data
          let tempPokemon = POKEMON_CARD_TEMPLATE.content.cloneNode(true);

          tempPokemon.querySelector('.card').setAttribute('data-bs-target', `#pokemon-${name}`);
          tempPokemon.querySelector('.card').setAttribute('aria-controls', `pokemon-${name}`);
          tempPokemon.querySelector('.card').setAttribute('alt', name);
          tempPokemon.querySelector('.pokemon-name').innerHTML = name;

          tempPokemon.querySelector('.collapse').setAttribute('id', `pokemon-${name}`);
          tempPokemon.querySelector('.card-body').innerHTML = `Could not find anything about <b>${name}</b> :(<br>${err}`;

          POKEMON_CARD_CONTAINER.appendChild(tempPokemon);
        });
    });
  },
  pokeCache: [],
  hidden: [],
  fetchPokemon: function (name, url, callback, errorCallback) {
    // We optimize performance by caching previous api call results in an array stored in this object (pokeCache)
    if (this.pokeCache[url]) {
      callback(this.pokeCache[url]);
      return;
    }

    // In case no cache entry exists we load data and store it in the cache
    fetch(url)
      .then((res) => res.json())
      .then((pokemon) => {
        this.pokeCache[url] = pokemon;

        callback(pokemon);
      })
      .catch((err) => {
        console.log("Could not load " + name, err)
        errorCallback(err);
      })
  },
  loadPage: function (pageUrl) {
    // We simply load all pokemon from the url, and then render them.
    // We also update pagination buttons in accordance to our current page
    let that = this;

    fetch(pageUrl)
      .then(res => res.json())
      .then(({ next, previous, results, count }) => {
        document.getElementById('pokemon-count').innerHTML = `${count} Pokémon available.`

        that.previousPageUrl = previous;
        that.nextPageUrl = next;

        // Pagination button responsivity
        if (!previous) {
          that.prevButton.classList.add('disabled');
        } else {
          that.prevButton.classList.remove('disabled');
        }

        if (!next) {
          that.nextButton.classList.add('disabled');
        } else {
          that.nextButton.classList.remove('disabled');
        }

        that.render(results)
      })
      .catch(err => {
        console.log(err)
      })
  },
  nextPage: function () {
    if (!this.nextPageUrl) {
      return;
    }

    this.loadPage(this.nextPageUrl)
  },
  previousPage: function () {
    if (!this.previousPageUrl) {
      return;
    }

    this.loadPage(this.previousPageUrl)
  },
  unhideAll: function () {
    // We keep a list of all hidden pokemons (theirs URLs specifically) in pokemonBrowser.hidden array
    // When user clicks "show all" button we remove all elements from that array and show all hidden elements on current page
    document.querySelectorAll('.card').forEach((elem) => elem.style.display = 'block');
    this.hidden = [];
  },
  previousPageUrl: undefined,
  nextPageUrl: undefined,
  pageSize: 20, // PokeAPI default
  prevButton: undefined,
  nextButton: undefined
};

let prevButton = document.getElementById('prevPage');
let nextButton = document.getElementById('nextPage');
let unhideButton = document.getElementById('unhideAll');

pokemonBrowser.init(prevButton, nextButton, unhideButton)
