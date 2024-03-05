/* eslint-disable react/prop-types */
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon} from '../pokemon'
import {PokemonInfoFallback} from '../pokemon'
import {PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [status, setStatus] = React.useState('Idle')
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  function createErrorAlert(error) {
    setStatus('Rejected')
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  React.useEffect(() => {
    if (!pokemonName) return
    setStatus('Pending')
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData)
        setStatus('Resolved')
      })
      .catch(error => setError(createErrorAlert(error)))
  }, [pokemonName])

  switch (status) {
    case 'Idle':
      return 'Submit a pokemon'
    case 'Rejected':
      return error
    case 'Resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      return <PokemonInfoFallback name={pokemonName} />
  }
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
