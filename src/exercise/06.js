/* eslint-disable react/prop-types */
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon} from '../pokemon'
import {PokemonInfoFallback} from '../pokemon'
import {PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [status, setStatus] = React.useState(['Idle', null])
  function createErrorAlert(error) {
    const errorDisplay = (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
    setStatus(['Rejected', errorDisplay])
  }
  React.useEffect(() => {
    if (!pokemonName) return
    setStatus(['Pending', <PokemonInfoFallback name={pokemonName} />])
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setStatus(['Resolved', <PokemonDataView pokemon={pokemonData} />])
      })
      .catch(error => createErrorAlert(error))
  }, [pokemonName])

  console.log(status)

  switch (status[0]) {
    case 'Idle':
      return 'Submit a pokemon'
    default:
      return status[1]
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
