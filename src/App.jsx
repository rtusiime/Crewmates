import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import { Doughnut } from 'react-chartjs-2';
import SearchContext from './context/SearchContext';
import supabase from './client';



const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const { searchTerm } = useContext(SearchContext); // Use the context
  const [pokemonsToDisplay, setPokemonsToDisplay] = useState('all');
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [activeButton, setActiveButton] = useState('all');
  const [numAttacker, setNumAttacker] = useState(0);
  const [numDefender, setNumDefender] = useState(0);
  const [numStrategist, setNumStrategist] = useState(0);

  const roleData = [
    { role: 'Attacker', percentage: numAttacker/(numAttacker+numDefender+numStrategist+1)*100 },
    { role: 'Defender', percentage: numDefender/(numAttacker+numDefender+numStrategist+1)*100 },
    { role: 'Strategist', percentage: numStrategist/(numAttacker+numDefender+numStrategist+1)*100 }
  ];


  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const { data: fetchedPokemons, error: error_1 } = await supabase
          .from('Pokemons')
          .select('*')
          .order('name');
        setPokemons(fetchedPokemons);
        getRoleCount();
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
    let filtered = pokemons;
    console.log('oogabooga:', pokemonsToDisplay);

    // Filter by type if it's not set to 'all'
    if (pokemonsToDisplay !== 'all') {
      filtered = pokemons.filter(pokemon =>
        pokemon.role.toLowerCase().includes(pokemonsToDisplay)
      );
    }
    else {
      filtered = pokemons;
    }
    console.log('searchTerm:', searchTerm);
    // Further filter by search term if it is provided
    if (searchTerm) {
      return filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    console.log('filtered:', filtered);
    return filtered;
  };

  const getRoleCount = () => {
     console.log('getRoleCount:', pokemons);
    let attackerCount = 0;
    let defenderCount = 0;
    let strategistCount = 0;

    pokemons.forEach(pokemon => {
      switch (pokemon.role) {
        case 'attacker':
          attackerCount++;
          break;
        case 'defender':
          defenderCount++;
          break;
        case 'strategist':
          strategistCount++;
          break;
        default:
          break;
      }
    });

    setNumAttacker(attackerCount);
    setNumDefender(defenderCount);
    setNumStrategist(strategistCount);
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
            <h1>Pockemon</h1>
          </div>

          <div className="pokemon-dashboard-list">
              <div className='pokemon-list-filters'>
                
              <button className='button-tertiary'
                style={activeButton === 'attacker' ? {
                  backgroundColor: '#545456',
                  boxShadow: '0 1px #666',
                  transform: 'translateY(2px)'
                } : null
                }
                onClick={() => {
                  setPokemonsToDisplay('attacker');
                  setActiveButton('attacker');
                  console.log('attacker button clicked');
                }}>Attacker</button>

              <button className='button-tertiary'
                style={activeButton === 'defender' ? {
                  backgroundColor: '#545456',
                  boxShadow: '0 1px #666',
                  transform: 'translateY(2px)'
                } : null
                }
                onClick={() => {
                  setPokemonsToDisplay('defender');
                  setActiveButton('defender');
                  console.log('defender button clicked');
                }}>Defender</button>

              <button
                className='button-tertiary'
                style={activeButton === 'strategist' ? {
                  backgroundColor: '#545456',
                  boxShadow: '0 1px #666',
                  transform: 'translateY(2px)'
                } : null
                }
                onClick={() => {
                  setPokemonsToDisplay('strategist');
                  setActiveButton('strategist');
                  console.log('strategist button clicked');
                }}>Strategist</button>

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
              {console.log('maamawo:', filteredPokemonData)}
              <PokemonList list={filteredPokemonData} />
              {console.log('katilaba:', filteredPokemonData)}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
