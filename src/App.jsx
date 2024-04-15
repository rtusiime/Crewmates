import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import PokemonList from './components/PokemonList';
import { Doughnut } from 'react-chartjs-2';
import SearchContext from './context/SearchContext';



const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const { searchTerm, setSearchTerm } = useContext(SearchContext); // Use the context
  const [pokemonsToDisplay, setPokemonsToDisplay] = useState('all');
  
  const roleData = [
    { role: 'Strategist', percentage: 36 },
    { role: 'Guardian', percentage: 22 },
    { role: 'Supporter', percentage: 42 }
  ];

  
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

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=6');
        setPokemons(response.data.results);
        console.log('Pokemon data:', pokemons);
      } catch (error) {
        console.error('Error fetching Pokemon data: ', error);
      }
      setIsLoading(false);
    };

    fetchPokemons();
  }, []);



  const filteredPokemonData = searchTerm
    ? pokemons.filter(data => data.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : pokemons;

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
              <button className='button-tertiary' onClick={setSearchTerm()}>Brawler</button>
              <button className='button-tertiary'>Defender</button>
              <button className='button-tertiary'>Supporter</button>
            </div>
            <PokemonList list={filteredPokemonData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
