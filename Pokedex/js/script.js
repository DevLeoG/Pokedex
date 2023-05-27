const pokemonName  = document.querySelector('.pokemon_name');
const pokemonNumber  = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPoke = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    
    if(APIResponse.status == 200){
    const data = await APIResponse.json();
   return data;
    }
}

const renderPokemon =async (pokemon) => {
    
    
    pokemonName.innerHTML= 'Loading...';
    pokemonNumber.innerHTML = "";
    
    const data = await fetchPokemon(pokemon);

    console.log(data);

    if(data){
    
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];

    input.value = "";
    searchPoke= data.id;
    }else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found ;-;';
        input.value = "";

    }

}

form.addEventListener('submit',( event )=> {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

buttonPrev.addEventListener('click',()=> {
   if(searchPoke > 1 ){
    searchPoke -= 1;
    renderPokemon(searchPoke);
   }
});

buttonNext.addEventListener('click',()=> {
    searchPoke += 1;
    renderPokemon(searchPoke);

    
});

renderPokemon(searchPoke);

