import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import { Doughnut } from 'react-chartjs-2';
import SearchContext from './context/SearchContext';
import supabase from './client';

const roleColors = {
  attacker: '#ff1f1f',   // Red
  defender: '#fbd743',   // Yellow
  strategist: '#5db9ff'  // Blue
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const { searchTerm } = useContext(SearchContext);
  const [activeButton, setActiveButton] = useState('all');
  const [numAttacker, setNumAttacker] = useState(0);
  const [numDefender, setNumDefender] = useState(0);
  const [numStrategist, setNumStrategist] = useState(0);
  const [chartData, setChartData] = useState({});
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const { data: fetchedPokemons, error } = await supabase
          .from('Pokemons')
          .select('*')
          .order('name');
        if (error) {
          throw error;
        }
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error('Error fetching Pokemon data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let attackerCount = 0;
    let defenderCount = 0;
    let strategistCount = 0;

    pokemons.forEach(pokemon => {
      switch (pokemon.role.toLowerCase()) {
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
  }, [pokemons]);

  useEffect(() => {
    const total = numAttacker + numDefender + numStrategist;
    const newChartData = {
      labels: ['Attacker', 'Defender', 'Strategist'],
      datasets: [
        {
          label: 'Pokemon Roles',
          data: [
            (numAttacker / total) * 100,
            (numDefender / total) * 100,
            (numStrategist / total) * 100,
          ],
          backgroundColor: [
            roleColors.attacker,
            roleColors.defender,
            roleColors.strategist,
          ],
          hoverOffset: 10,
          borderWidth: 0,
          cutout: '60%',
        }
      ],
    };
    setChartData(newChartData);
  }, [numAttacker, numDefender, numStrategist]);

  useEffect(() => {
    const getFilteredPokemonData = () => {
      let filtered = pokemons;

      if (activeButton !== 'all') {
        filtered = filtered.filter(pokemon =>
          pokemon.role.toLowerCase() === activeButton
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return filtered;
    };
    setFilteredPokemonData(getFilteredPokemonData());
  }, [pokemons, activeButton, searchTerm]);

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

  const handleRoleButtonClick = (role) => {
    setActiveButton(role);
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
              {['attacker', 'defender', 'strategist', 'all'].map((role) => (
                <button
                  key={role}
                  className='button-tertiary'
                  style={activeButton === role ? {
                    backgroundColor: '#545456',
                    boxShadow: '0 1px #666',
                    transform: 'translateY(2px)',
                  } : {}}
                  onClick={() => handleRoleButtonClick(role)}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
            <PokemonList list={filteredPokemonData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;