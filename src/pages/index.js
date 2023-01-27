import { useState, useEffect } from 'react';
import Link from 'next/link'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const getPokemonId = (pokemon) => {
  return pokemon.url
        .replace('https://pokeapi.co/api/v2/pokemon/', '')
        .replace('/', '')
}

const Card = (props) => {
  const [likes, setLikes] = useState(0)

  return(
    <div className="card col-4 d-flex justify-content-center">
      <img src={props.src} className="card-img-top" alt="pokemon"/>
      <div className="card-body">
        <Link href={{pathname: "pokemon/[id]", query: {id: props.id}}}>
          <h5 className="card-title">{props.title}</h5>
        </Link>
        <p className="card-text">summary</p>
        {likes === 0 ? null : <p className="card-text">Likes: {likes}</p>}
        <button onClick={() => {setLikes(likes + 1)}} href="#" className="btn btn-primary">
          {props.buttonText}
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [offset, setOffset] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const limit = 20

  useEffect(() => {
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(json => {
      setPokemonList([...pokemonList, ...json['results']])
      setLoading(false)
      })
  }, [offset])

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {pokemonList.map(pokemon => {
            const id = getPokemonId(pokemon)
            return(
                <Card
                id={id}
                buttonText="Like Button" 
                title={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
                />
            )
          })}
          </div>
          {isLoading ? 
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> 
          : 
          <button className="" onClick={() => setOffset(limit + offset)}>
            MORE
          </button>
          }
      </div>
    </div>
  )
}
