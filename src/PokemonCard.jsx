export const PokemonCard = ({ pokemonData }) => {
    const typeColors = {
        normal: '#A8A878',
        fighting: '#C03028',
        flying: '#A890F0',
        poison: '#A040A0',
        ground: '#E0C068',
        rock: '#B8A038',
        bug: '#A8B820',
        ghost: '#705898',
        steel: '#B8B8D0',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        psychic: '#F85888',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        fairy: '#EE99AC'
    };

    const getTypeColor = (type) => typeColors[type] || '#68A090';

    return (
        <div className="pokemon-card">
            <div className="pokemon-card-inner">
                <div className="pokemon-image-container">
                    <img
                        src={pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                        className="pokemon-image"
                        loading="lazy"
                    />
                </div>

                <div className="pokemon-content">
                    <h2 className="pokemon-name">{pokemonData.name}</h2>
                    <div className="pokemon-id">#{pokemonData.id.toString().padStart(3, '0')}</div>

                    <div className="pokemon-types">
                        {pokemonData.types.map((typeInfo, index) => (
                            <span
                                key={index}
                                className="pokemon-type"
                                style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
                            >
                                {typeInfo.type.name}
                            </span>
                        ))}
                    </div>

                    <div className="pokemon-stats">
                        <div className="stat-row">
                            <div className="stat-item">
                                <span className="stat-label">Height</span>
                                <span className="stat-value">{(pokemonData.height / 10).toFixed(1)}m</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Weight</span>
                                <span className="stat-value">{(pokemonData.weight / 10).toFixed(1)}kg</span>
                            </div>
                        </div>

                        <div className="stat-row">
                            <div className="stat-item">
                                <span className="stat-label">Experience</span>
                                <span className="stat-value">{pokemonData.base_experience}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Speed</span>
                                <span className="stat-value">{pokemonData.stats[5].base_stat}</span>
                            </div>
                        </div>

                        <div className="abilities-section">
                            <span className="stat-label">Abilities</span>
                            <div className="abilities-list">
                                {pokemonData.abilities.map((ability, index) => (
                                    <span key={index} className="ability-tag">
                                        {ability.ability.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};