/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`

export default function Fetcher() {
    // your task here is to fetch Pokemon from a given URL and just display is name
    // once a Pokemon is fetched, increment your id to fetch the next one on click

    const [pokeId, setPokeId] = useState(1)
    const [pokemon, setPokemon] = useState([])

    // fetch one Pokemon data when this component in rendered
    useEffect(() => {
        (async () => {
            try {
                const newPokemon = await fetch(getPokemonUrl(pokeId))
                    .then(pokemon => pokemon.json())

                setPokemon(pokemon => [
                    ...pokemon,
                    {
                        name: newPokemon.name
                    }
                ])
            } catch (e) {
                console.log(e)
            }
        })()
    }, [pokeId])

    function incrementPokemonId() {
        setPokeId(pokeId => pokeId + 1)
    }

    // return 2 elements:
    // 1st: a button which will trigger another fetch on click, for a Pokemon with next id
    // 2nd: Pokemons
    return (
        <div className="text-center">
            <button className="btn btn-success my-2" onClick={incrementPokemonId}>FETCH</button>
            {/* display pokemons in a list here, you can use your existing components from homework number 4 or just display a name */}
            <ul className="list-group">
                {
                    pokemon.map(({ name }) => <li key={name} className="list-group-item">{name}</li>)
                }
            </ul>
        </div>
    )
}