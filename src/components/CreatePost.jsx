import './CreatePost.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import SearchContext from '../context/SearchContext';
// import supabase from '../client';
const roles = ["Strategist", "Guardian", "Supporter", "Brawler", "Defender"];

const CreatePost = () => {

    const [post, setPost] = useState({ name: "", role: "" });
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

    // const createPost = async (event) => {
    //     // console.log('calling create post');
    //     event.preventDefault();
    //     const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    //     const posts = [
    //         {
    //             'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
    //             'author': 'Harvey Milian',
    //             'description': descr
    //         },
    //         {
    //             'title': 'Love Lock in Paris 🔒',
    //             'author': 'Beauford Delaney',
    //             'description': descr
    //         },
    //         {
    //             'title': 'Wear Pink on Fridays 🎀',
    //             'author': 'Onika Tonya',
    //             'description': descr
    //         },
    //         {
    //             'title': 'Adopt a Dog 🐶',
    //             'author': 'Denise Michelle',
    //             'description': descr
    //         },
    //     ]
    //     const { data, error } = await supabase
    //         .from('Posts')
    //         .insert(
    //             { title: post.title, author: post.author, description: post.description })
    //         .select();
    //     if (error) {
    //         console.log(error);
    //     }
    //     else {
    //         console.log('Post created successfully ', data);
    //     }
    //     console.log(data)
    //     window.location = '/';
    // }

    const createPost = (event) => {
        event.preventDefault();
       const pokemonData = filteredPokemonData.find(pokemon => pokemon.name === post.name);
        if (!pokemonData) {
            alert('Please select a valid pokemon');
            return;
        }
        console.log('Post created successfully ', post);
        window.location = '/';
    }

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
                        <input type="text" id="name" name="name" onChange={handleChange} />
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
                <PokemonList list={filteredPokemonData} />
            </div>
        </div>
    )
}

export default CreatePost