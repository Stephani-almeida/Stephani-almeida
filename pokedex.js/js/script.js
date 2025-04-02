const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search'); // Adicionado seletor para o input
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  try {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    } else {
      return null; // Retorna null se o Pokémon não for encontrado
    }
  } catch (error) {
    console.error('Erro ao buscar o Pokémon:', error);
    return null; // Retorna null em caso de erro na requisição
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.style.display = 'none';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    // Tenta usar a animação, se disponível
    if (data.sprites.versions['generation-v'] && data.sprites.versions['generation-v']['black-white'] && data.sprites.versions['generation-v']['black-white'].animated && data.sprites.versions['generation-v']['black-white'].animated.front_default) {
      pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    } else {
      // Se a animação não estiver disponível, usa a imagem estática padrão
      pokemonImage.src = data.sprites.front_default;
    }

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'Not found :c';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);