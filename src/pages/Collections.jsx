import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Collections.css'; // Import CSS file for styling

function Collections() {
  const [pokemonData, setPokemonData] = useState([]);
  const [collectedPokemon, setCollectedPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState(100); // Initial points
  const [filter, setFilter] = useState('all'); // Filter: 'all', 'collected', 'uncollected'
  const [showModal, setShowModal] = useState(false); // State to control modal display
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State to store the selected Pokemon

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = response.data.results;
        const data = await Promise.all(pokemonList.map(async (pokemon) => {
          const pokeResponse = await axios.get(pokemon.url);
          return {
            id: pokeResponse.data.id,
            name: pokeResponse.data.name,
            image: pokeResponse.data.sprites.front_default,
            collected: false,
          };
        }));
        setPokemonData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleGacha = () => {
    if (points < 10) {
      alert("Insufficient points to purchase a gacha!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const randomPokemon = pokemonData[randomIndex];
    const updatedPokemonData = [...pokemonData];
    updatedPokemonData[randomIndex] = { ...randomPokemon, collected: true };
    setPokemonData(updatedPokemonData);
    setCollectedPokemon([...collectedPokemon, randomPokemon]);
    setPoints(points - 10); // Deduct 10 points for each gacha purchase

    // Show modal with the selected Pokemon
    setShowModal(true);
    setSelectedPokemon(randomPokemon);
  };

  const filteredPokemon = () => {
    if (filter === 'collected') {
      return pokemonData.filter(pokemon => pokemon.collected);
    } else if (filter === 'uncollected') {
      return pokemonData.filter(pokemon => !pokemon.collected);
    } else {
      return pokemonData;
    }
  };

  const totalCollected = collectedPokemon.length;
  const totalPokemon = pokemonData.length;

  return (
    <div className="collections-container">
      <div className="points">Points: {points}</div>
      <button onClick={handleGacha}>Purchase Gacha (10 points)</button>
      <h2>Pokemon</h2>
      <div>
        <div>Total Collected: {totalCollected}/{totalPokemon}</div>
        <label>Show: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="collected">Collected</option>
          <option value="uncollected">Uncollected</option>
        </select>
      </div>
      <div className="card-container">
        {filteredPokemon().map((pokemon) => (
          <div className={`card ${pokemon.collected ? 'collected' : 'uncollected'}`} key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            <div>{pokemon.name}</div>
            <div>#{pokemon.id}</div>
          </div>
        ))}
      </div>
      {showModal && selectedPokemon && (
        <div className="pack-opening-modal" onClick={() => setShowModal(false)}>
          <div className="pack-opening-content" onClick={(e) => e.stopPropagation()}>
            <div className="opening-animation">
              <div className="opened-card">
                <img src={selectedPokemon.image} alt={selectedPokemon.name} />
                <div>{selectedPokemon.name}</div>
                <div>#{selectedPokemon.id}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collections;
