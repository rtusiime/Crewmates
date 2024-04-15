import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import SearchContext from '../context/SearchContext';
import { useParams } from 'react-router-dom';

const roles = ["Strategist", "Guardian", "Supporter", "Brawler", "Defender"];

const EditPost = () => {
    const [post, setPost] = useState({ name: "", role: "" });
    const [isFetching, setIsFetching] = useState(false);
    const { searchTerm } = useContext(SearchContext);
    const { pokemonId } = useParams(); // Assuming you're using react-router-dom v5

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const pokemon = response.data;
                
                // Assuming you have a way to get the role from the Pokemon details
                // Perhaps via additional data stored elsewhere
                const pokemonRole = extractRoleFromPokemonDetails(pokemon);

                setPost({ name: pokemon.name, role: pokemonRole });
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
            setIsFetching(false);
        };

        fetchPokemonDetails();
    }, [pokemonId]);

    // Assuming you have captured the role mapping in a separate function
    const extractRoleFromPokemonDetails = (details) => {
        // Logic to determine the role
        return "role_here";
    };

    const handlePostUpdate = (event) => {
        event.preventDefault();
        // You would have logic here to submit the updated post
        console.log('Post updated successfully ', post);
        window.location = '/'; // or use history.push('/') if using react-router hooks
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className='edit-page'>
            <h1>Edit Pokemon</h1>
            {/* ... rest of the form here, prepopulated with state from post */}
            <div className='form-input'>
                {/* ... name and role inputs with values set from post state */}
            </div>
            {/* ... submit button and handlers */}
        </div>
    );
};

export default EditPost;