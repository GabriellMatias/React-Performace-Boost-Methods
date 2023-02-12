import { SearchResults } from "@/components/SearchResults"
import { FormEvent, useCallback, useState } from "react"


/* Componentes renderizam ->
- Quando o estado dentro da um componente muda
- Quandoo o pai de um componente filho renderiza [ele renderiza os filhos novamente] 

*/

/*Fluxo de renderizacao do react
- Cria nova versao do componente
- Compara com a versao anterior
- Se houve alteracoes, mostra em tela
*/


/* React nao re-renderiza tudo, ele compara ambas das versoes e re-renderiza 
de acordo com as necessidades */

export interface ProductData{
    id: number   
    title: string
    price: number
    priceFormatted:number

}

interface ResultsProps{
  totalPrice: number
  data: Array<ProductData>
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<ResultsProps>({
    totalPrice: 0,
    data: []
  })
  

  async function handleSearch(event:FormEvent){
    event.preventDefault()
    /*Verifica que o valor do input nao esta vazio */
    if(!search.trim()){
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })


    const formattedDataProducs = data.map((product:any)=>{
      return{
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formattedPrice.format(product.price)
      }
    })

    /* Realizar o calculo perto da requisicao para evitar que o calculo seja refeito
    sem necessidade */
    const totalPrice = data.reduce((total:number, product:any)=>{
      return total + product.price
    }, 0)
    setResults({totalPrice, data: formattedDataProducs})

  }
  /* Se nao passar o useCallBack para essa funcao ela vai mudar toda vez que o react 
  re-renderizar o componente, dessa maneira ela vai mudar o valor, ou seja, assim que ela
  mudar ela vai renderizar outros componentes filhos que tem a propriedade memo
  pois o react vai perceber uma mudanca de propriedade.. */

  const addToWishList = useCallback( async(id:number) => {
    console.log(id);   
  }, [])

  


  return (
   <div>
    <h1>Search</h1>

    <form action="" onSubmit={handleSearch}>
      <input 
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      />

    <button type="submit">Buscar</button>
    </form>

    <SearchResults data={results.data}
    totalPrice={results.totalPrice}
    onAddtoWishList={addToWishList}/>
   </div>
  )
}
