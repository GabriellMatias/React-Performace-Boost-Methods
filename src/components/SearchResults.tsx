import { ProductItem } from "./ProductItem"

interface SearchResultsProps{
  results: Array<{
    id: number   
    title: string
    price: number
  }>
}

export function SearchResults({results}:SearchResultsProps){
  return(
    <div>
      {results.map((product)=>{
        return(
          <ProductItem product={product} key={product.id}/>
        )
      })}
    </div>
  )
}