export interface AddProductToWishListProps{
  onAddtoWishList:() => void
  onRequestClose:() => void
}

export function AddProductToWishList({onAddtoWishList, onRequestClose}: AddProductToWishListProps){
  return(
    <span>Deseja Adicionar aos Favoritos?

      <button onClick={onAddtoWishList}>Yes</button>
      <button onClick={onRequestClose}>No</button>
      
    </span>
  )
}