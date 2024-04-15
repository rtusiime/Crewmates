import './EditPost.css'
import React, { useState, useEffect, useContext } from 'react';
import supabase from '../client';
import { useLocation, useParams } from "react-router-dom";
const roles = ["Strategist", "Attacker", "Defender"];
import axios from 'axios';

const EditPost = () => {
    const { name } = useParams();
    console.log('Name:', name);
    const location = useLocation();
    console.log('Location:', location);
    const role = location.state.role;
    const url = location.state.url;
    const [post, setPost] = useState({ name: name, role: role });
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchPokemonOfficialArtwork = async (url) => {
            try {
                const response = await axios.get(url);
                const officialArtwork = response.data.sprites.other['official-artwork'].front_default;
                console.log('Official Artwork URL:', officialArtwork);
                setImageUrl(officialArtwork);
            } catch (error) {
                console.error('Failed to fetch Pokémon data:', error);
            }
        }
        fetchPokemonOfficialArtwork(url)

    }, []);


    // Example usage


    const updatePost = async (event) => {
        event.preventDefault();

        // If Pokémon does not exist, proceed to insert it
        const { data, error } = await supabase
            .from('Pokemons')
            .update(
                { role: post.role }  // Only updating the name field
            )
            .eq('name', post.name); // Filter to find a row where the 'name' column matches `post.name`

        if (error) {
            console.error('Error updating Pokémon:', error);

        } else {
            console.log('Post created successfully:', data);
            window.location = '/'; // Redirect if needed
        }
    }

    const cancelSubmit = (event) => {
        window.location = '/';
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
            <h1>Update your character</h1>
            <h2>{name}</h2>
            <img src={imageUrl} alt={`picture of ${name}`} />
            <div className='create-form' >
                <form onSubmit={updatePost} >
                    <div className='form-input'>
                        <label htmlFor="role">Role:</label><br />
                        <select id="role" name="role" onChange={handleChange} value={post.role}>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-buttons'>
                        <input type="submit" value="Done" onClick={updatePost} />
                        <input type="submit" value="Cancel" onClick={cancelSubmit} />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditPost