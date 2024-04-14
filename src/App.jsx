import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PokemonList from './components/PokemonList';
import { Doughnut } from 'react-chartjs-2';
import addIcon from './assets/add.svg';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
        setPokemons(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data: ', error);
      }
      setIsLoading(false);
    };

    fetchPokemons();
  }, []);

  return (
    <div className='App'>
      {isLoading ? (
        <div>Loading Pokemons...</div>
      ) : (
        <div>
            <div className='summary'>
            <div className='distribution'>
              <Doughnut data={chartData} options={options} />
            </div>
              <div className="right-data">
                <div className='num-crew'>
                {pokemons.length || '0'}
                </div>
                <button className='add-pokemon-button'>
                  <img src={addIcon} alt="addicon" /></button>
            </div>
          </div>
          <div className="pokemon-dashboard-list">
            <div>
              <button>Brawler</button>
              <button>Defender</button>
              <button>Supporter</button>
            </div>
            <PokemonList list={pokemons} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
