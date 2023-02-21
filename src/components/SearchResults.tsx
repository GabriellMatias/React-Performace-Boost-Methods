import { ProductData } from "@/pages"
import { useMemo } from "react"
import { ProductItem } from "./ProductItem"
import {List, ListRowRenderer} from "react-virtualized"

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


  const rowRender: ListRowRenderer = ({index, style, key}) =>{

    return(
      <div style={style} key={key}>
        <ProductItem product={data[index]}
          onAddToWishList={onAddtoWishList}/>
      </div>
    )

  }

  return(
    <div>

      <h2>{totalPrice}</h2>

      <List height={300}
      rowHeight={25}
      width={900}
      overscanRowCount={5}
      rowCount={data.length}
      rowRenderer={rowRender}
      />

      {/* {data.map((product)=>{
        return(
          <ProductItem product={product} key={product.id}
          onAddToWishList={onAddtoWishList}/>
        )
      })} */}
    </div>
  )
}

/* QUando utilizar UseMemo:
- Utilizar para calculos PESADOS
- Igualdade Referencial [quando repassa a informacao para um componente filho]
*/