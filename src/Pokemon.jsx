import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");


    const API = "https://pokeapi.co/api/v2/pokemon?limit=250&offset=0";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            const detailedPokemonData = data.results.map(async (curPokemon) => {

                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });

            const pokemonData = await Promise.all(detailedPokemonData);
            console.log(pokemonData);
            setPokemon(pokemonData);
            setLoading(false);

        }
        catch (error) {
            console.error("Error fetching Pokemon data:", error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    //Search functionality
    const searchData = pokemon.filter((curPokemon) => {
        return curPokemon.name.toLowerCase().includes(search.toLowerCase());
    });

    if (loading) {
        return (
            <div className="loading-container">
                <div className="pokeball-loader">
                    <div className="pokeball">
                        <div className="pokeball-top"></div>
                        <div className="pokeball-bottom"></div>
                        <div className="pokeball-center">
                            <div className="pokeball-button"></div>
                        </div>
                    </div>
                </div>
                <h2 className="loading-text">Catching Pokemon...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h1>Oops! Something went wrong</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1 className="main-title">PokéDex</h1>
                    <p className="subtitle">Discover and explore the world of Pokémon</p>
                </header>

                <div className="search-container">
                    <div className="search-box">
                        <div className="search-icon">🔍</div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for a Pokémon..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {searchData.length > 0 && (
                    <div className="results-count">
                        Showing {searchData.length} Pokémon{search && ` for "${search}"`}
                    </div>
                )}

                {searchData.length > 0 ? (
                    <div className="pokemon-grid">
                        {searchData.map((curPokemon) => (
                            <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
                        ))}
                    </div>
                ) : search ? (
                    <div className="no-results">
                        <h3>No Pokémon found</h3>
                        <p>Try searching for a different Pokémon name</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};