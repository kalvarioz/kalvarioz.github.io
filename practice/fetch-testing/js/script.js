async function displayPokemon() {

    const name = document.getElementById('pokemonIn').value.toLowerCase();
    const out = document.getElementById('output');

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const pokemon = await res.json();


    const sprites = `
    <img src="${pokemon.sprites.front_default}" alt = "front">
    <img src="${pokemon.sprites.back_default}" alt="back">
        `;

    const front = pokemon.sprites.front_default;
    const back = pokemon.sprites.back_default;

    
    const stats = pokemon.stats
    .map(s=> `<li>${s.stat.name}: <strong>${s.base_stat}</strong></li>`)


    const abilities = pokemon.abilities
    .map(a=> `<li>${a.ability.name}</li>`)
    .join('');

    output.innerHTML = `<h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
    ${sprites}
    <h3>Stats</h3> <ul>${stats}</ul>
    <h3>Abilities</h3> <ul>${abilities}</ul>
    
    `




}

