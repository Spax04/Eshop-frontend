// Utilit maked for displaying error message
import {toast,navigate} from "./imports"
export const getError = error => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export  const addToCartHandler = async (data,cartItems,ctxDispatch)=>{
  try {
    console.log(cartItems)
    const existItem = cartItems.find(x => x._id === data._id)

    
    const quantity = existItem ? existItem.quantity + 1 : 1



    if (data.countInStock < quantity) {
      throw new Error('Sorry. Product is out of stock')
    }

    ctxDispatch({
      type: 'ADD_TO_CART',
      payload: { ...data, quantity: quantity }
    })
  } catch (err) {
    toast.error(getError(err))
  }
}
