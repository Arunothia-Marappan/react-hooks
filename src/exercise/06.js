/* eslint-disable react/prop-types */
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon} from '../pokemon'
import {PokemonInfoFallback} from '../pokemon'
import {PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemonState, setPokemonState] = React.useState(null)
  const [error, setError] = React.useState(null)
  function createErrorAlert(error) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  React.useEffect(() => {
    if (!pokemonName) return
    setPokemonState(null)
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemonState(pokemonData)
      })
      .catch(error => setError(createErrorAlert(error)))
  }, [pokemonName])

  if (!pokemonName) return 'Submit a pokemon'
  if (!pokemonState)
    return error ? error : <PokemonInfoFallback name={pokemonName} />
  return <PokemonDataView pokemon={pokemonState} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
