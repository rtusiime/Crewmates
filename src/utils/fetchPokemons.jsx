
async function fetchPokemons() {
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