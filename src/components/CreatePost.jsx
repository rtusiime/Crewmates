import './CreatePost.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import SearchContext from '../context/SearchContext';
import supabase from '../client';
const roles = ["Strategist", "Guardian", "Supporter", "Brawler", "Defender"];

const CreatePost = () => {

    const [post, setPost] = useState({ name: "", role: "Guardian", url: ""});
    const [pokemons, setPokemons] = useState([]);
    const { searchTerm } = useContext(SearchContext); // Use the context
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=3');
                const fetchedPokemons = response.data.results;
                setPokemons(fetchedPokemons);
            } catch (error) {
                console.error('Error fetching Pokemon data: ', error);
            }
        };

        fetchPokemons();
    }, []);

    const createPost = async (event) => {
        event.preventDefault();
    
        // Assuming `post.name` is the name of the Pokémon you are trying to insert.
        const pokemonData = filteredPokemonData.find(pokemon => pokemon.name === post.name);
        if (!pokemonData) {
            alert('Please select a valid pokemon');
            return;
        }
    
        // Checking if the Pokémon already exists in the database
        const { data: existingPokemon, error: error_1 } = await supabase
            .from('Pokemons')
            .select('*') // Fetch all columns
            .eq('name', post.name) // Filter to find a row where the 'name' column matches `post.name`
            .single(); // Assumes that 'name' is a unique identifier, and you expect at most one row
    
        if (error_1) {
            console.error('Error fetching existing Pokémon:', error_1);
            return;
        }
    
        if (existingPokemon) {
            alert('You already have this Pokemon! Please select another one');
            return;
        }
    
        // If Pokémon does not exist, proceed to insert it
        const { data, error: error_2 } = await supabase
            .from('Pokemons')
            .insert([
                { name: post.name, url: post.url, role: post.role }
            ]);
    
        if (error_2) {
            console.error('Error inserting new Pokémon:', error_2);

        } else {
            console.log('Post created successfully:', data);
            window.location = '/'; // Redirect if needed
        }
    }
    



    useEffect(() => {
        setFilteredPokemonData(getFilteredPokemonData());
        // Moved inside this useEffect so we are sure we are logging the updated state
        // console.log('Filtered Pokemon data:', filteredPokemonData);
        // console.log('Pokemon data:', pokemons);
    }, [pokemons, searchTerm]);

    const getFilteredPokemonData = () => {
        let filteredByType = pokemons;
        // console.log('searchTerm:', searchTerm);
        // Further filter by search term if it is provided
        if (searchTerm) {
            return filteredByType.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // console.log('filteredByType:', filteredByType);
        return filteredByType;
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }))
            console.log('Post:', post);
    };

    return (
        <div className='create-page'>
            <h1>Choose your character</h1>
            <div className='create-form' >
                <form onSubmit={createPost} >
                    <div className='form-input'>
                        <label htmlFor="name">Name: </label> <br />
                        <input type="text" id="name" value={post.name} name="name" onChange={handleChange} />
                    </div>

                    <div className='form-input'>
                        <label htmlFor="role">Role:</label><br />
                        <select id="role" name="role" onChange={handleChange} value={post.role}>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" value="Submit" onClick={createPost} />
                </form>
            </div>
            <div className="pokemon-dashboard-list">
                <PokemonList list={filteredPokemonData} parent={'CreatePost'} setPost={setPost} post={post} />
            </div>
        </div>
    )
}

export default CreatePost