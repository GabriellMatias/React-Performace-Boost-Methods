import { ProductData } from "@/pages"
import { memo, useState } from "react"
import { AddProductToWishListProps } from "./AddProductToWishList"
import dynamic from "next/dynamic"

/* code spliting, so faz a importacao do componente quando vc vai usar ela
para evitar que faca a importacao e nao utilize ao componente ou blibioteca
desse modo ganha velocidade no tempo de build */
const AddProductToWishList = dynamic<AddProductToWishListProps>(()=>{
  return import("./AddProductToWishList").then(mod => mod.AddProductToWishList)
},
/*Como o componente so vai ser renderizado quando o usuario necessitar, e importante
como segundo parametro do dinamic, passar um loading */
 {
  loading:()=> <span>Carregando...</span>
})

interface ProductItemProps{
  product:ProductData
    onAddToWishList: (id:number) => void
}

export function ProductItemComponent({product, onAddToWishList}:ProductItemProps){

  const [isAddingWishList, setIsAddingWishList] = useState(false)

  return(
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={()=> setIsAddingWishList(true)}>Adicionar aos favoritos</button>
     {isAddingWishList && (
      <AddProductToWishList 
      onAddtoWishList={() =>
       onAddToWishList(product.id)}
      onRequestClose={()=>setIsAddingWishList(false)}
      />
     )}
    </div>
  )

}
/* utilizando o Memo para evitar que seja criado uma nova versao do componente caso
nenhuma propriedade do componente for alterada */

/*DIFERENTE DO USEMEMO */
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps)=>{
  /* comparando as propriedades para saber se deve ser re-renderizado */
  return Object.is(prevProps.product, nextProps.product)
})

/* Memo faz um shallow compare -> comparacao rasa por isso manda segundo parametro
que e uma funcao falando se ele e igual ou nao ao anterior */

/*Situacoes para utilizar o Memo:
- Componentes puros -> apenas para mostrar algo visual
- Componentes que renderizam demais -> controled forms
- Re-renderiza com as mesmas props
- Componentes com tamanho medio/grande por causa do custo

*/