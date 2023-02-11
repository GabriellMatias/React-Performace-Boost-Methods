import { SearchResults } from "@/components/SearchResults"
import { FormEvent, useState } from "react"

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  

  async function handleSearch(event:FormEvent){
    event.preventDefault()
    /*Verifica que o valor do input nao esta vazio */
    if(!search.trim()){
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()
    setResults(data)
  }

  return (
   <div>
    <h1>Search</h1>

    <form action="" onSubmit={handleSearch}>
      <input 
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      />

    <button type="submit"></button>
    </form>

    <SearchResults results={results}/>
   </div>
  )
}
