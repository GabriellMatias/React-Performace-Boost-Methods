import { ProductData } from "@/pages"
import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

interface SearchDataProps{
  data: Array<ProductData>
  onAddtoWishList: (id: number) => void
  totalPrice:number
}

export function SearchResults({data, onAddtoWishList, totalPrice}:SearchDataProps){
  /* Use memo memoriza resultados de calculos para evitar que sejam refeitos 
  sem necessidade.  */
  /* Passa uma funcao que retorna o reducer por exemplo, e depois passa o array
  que informa quando ele deve fazer o calculo dnovo [igual ao useEffect] */


  return(
    <div>

      <h2>{totalPrice}</h2>

      {data.map((product)=>{
        return(
          <ProductItem product={product} key={product.id}
          onAddToWishList={onAddtoWishList}/>
        )
      })}
    </div>
  )
}

/* QUando utilizar UseMemo:
- Utilizar para calculos PESADOS
- Igualdade Referencial [quando repassa a informacao para um componente filho]
*/