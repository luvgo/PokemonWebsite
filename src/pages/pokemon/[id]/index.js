import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link  from "next/link"


const Card = (props) => {
    return(
      <div className="card col-4 d-flex justify-content-center">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${props.id}.png`} 
        className="card-img-top" 
        alt="pokemon"
        />
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p>
                {props.weight}
            </p>
            <Link href="/">
                <button type="button" class="btn btn-primary">Back</button>
            </Link>
        </div>
      </div>
    )
  }

export default function Pokemon() {
    const [pokemon, setPokemon] = useState([])
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()
    const { id } = router.query
    
    useEffect(() => {
        if(!router.isReady) return
        setLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((json) => {
            setPokemon(json)
            setLoading(false)
        })
    },[router.isReady])

    return (
        <div className="App">
        <div className="container">
          <div>
                <Card
                id={id}
                buttonText="Like Button" 
                title={pokemon.name}
                weight={pokemon.weight}
                />
            </div>
            {isLoading ? 
            <div className="spinner-border d-flex justify-content-center align-content-center" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> 
            : null}
        </div>
      </div>
    )
}