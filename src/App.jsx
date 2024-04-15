import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import PokemonList from './components/PokemonList';
import { Doughnut } from 'react-chartjs-2';
import SearchContext from './context/SearchContext';



const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const { searchTerm } = useContext(SearchContext); // Use the context
  const [pokemonsToDisplay, setPokemonsToDisplay] = useState('all');
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [activeButton, setActiveButton] = useState('all');

  const roleData = [
    { role: 'Strategist', percentage: 36 },
    { role: 'Guardian', percentage: 22 },
    { role: 'Supporter', percentage: 42 }
  ];

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=15');
        const fetchedPokemons = response.data.results;
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error('Error fetching Pokemon data: ', error);
      }
      setIsLoading(false);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemonData(getFilteredPokemonData());
    // Moved inside this useEffect so we are sure we are logging the updated state
    console.log('Filtered Pokemon data:', filteredPokemonData);
    console.log('Pokemon data:', pokemons);
  }, [pokemons, pokemonsToDisplay, searchTerm]);

  const getFilteredPokemonData = () => {
    let filteredByType = pokemons;
    console.log('oogabooga:', pokemonsToDisplay);

    // Filter by type if it's not set to 'all'
    if (pokemonsToDisplay !== 'all') {
      filteredByType = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(pokemonsToDisplay)
      );
    }
    else {
      filteredByType = pokemons;
    }
    console.log('searchTerm:', searchTerm);
    // Further filter by search term if it is provided
    if (searchTerm) {
      return filteredByType.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredByType;
  };


  const chartData = {
    labels: roleData.map(item => item.role),
    datasets: [
      {
        label: 'Pokemon Roles',
        data: roleData.map(item => item.percentage),
        backgroundColor: ['#ff1f1f', '#5db9ff', '#fbd743'],
        hoverBackgroundColor: ['#FF6384bb', '#36A2EBbb', '#FFCE56bb'],
        hoverOffset: 10,
        borderWidth: 0,
        cutout: '60%',
        plugins: {
          centerText: pokemons.length.toString(), // Set the text here
        },
      }
    ]
  };

  // Include the number of Pokemons as part of the centerText plugin option.
  const options = {
    responsive: true,
    plugins: {
      centerTextPlugin: { // Corrected the plugin property key
        text: pokemons.length.toString(),
        color: '#FFFFFF' // Or any other color you want for the text
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    }
  };


  return (
    <div className='App'>
      {isLoading ? (
        <div>Loading Pokemons...</div>
      ) : (
        <div className='dashboard'>
          <div className='distribution'>
            <div className='doughnut'>
              <Doughnut data={chartData} options={options} />
            </div>
            <h1>Pockemons</h1>
          </div>

          <div className="pokemon-dashboard-list">
              <div className='pokemon-list-filters'>
                
              <button className='button-tertiary'
                style={activeButton === 'brawler' ? {
                  backgroundColor: '#545456',
                  boxShadow: '0 1px #666',
                  transform: 'translateY(2px)'
                } : null
                }
                onClick={() => {
                  setPokemonsToDisplay('b');
                  setActiveButton('brawler');
                  console.log('brawler button clicked');
                }}>Brawler</button>

              <button className='button-tertiary'
                style={activeButton === 'defender' ? {
                  backgroundColor: '#545456',
                  boxShadow: '0 1px #666',
                  transform: 'translateY(2px)'
                } : null
                }
                onClick={() => {
                  setPokemonsToDisplay('c');
                  setActiveButton('defender');
                  console.log('Defender button clicked');
                }}>Defender</button>

              <button
                className='button-tertiary'
                style={activeButton === 'supporter' ? {
                  backgroundColor: '#545456',
                  boxShadow: '0 1px #666',
                  transform: 'translateY(2px)'
                } : null
                }
                onClick={() => {
                  setPokemonsToDisplay('s');
                  setActiveButton('supporter');
                  console.log('Supporter button clicked');
                }}>Supporter</button>

              <button
                className='button-tertiary'
                style={activeButton === 'all' ? {
                  backgroundColor: '#545456',
                  boxShadow: '0 1px #666',
                  transform: 'translateY(2px)'
                } : null
                }
                onClick={() => {
                  setPokemonsToDisplay('all');
                  setActiveButton('all');
                  console.log('All button clicked');
                }}>All</button>
            </div>
            <PokemonList list={filteredPokemonData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
