import { ProductData } from "@/pages"
import { memo } from "react"

interface ProductItemProps{
  product:ProductData
    onAddToWishList: (id:number) => void
}

export function ProductItemComponent({product, onAddToWishList}:ProductItemProps){

  return(
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishList(product.id)}>Add to Wish List</button>
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