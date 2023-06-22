import { createContext, useState, useEffect } from "react";



// this function will now allow us to essentially add a new product into the Cart and keep track of the quantity


const addCartItem = (cartItems, productToAdd) => {
  
  // find if cartItems contains productToAdd
const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
    )
    // if Found, increment quantity


    // This code is saying if we found a match for existingCArtITem then we want to return a new array of cartItems
  if(existingCartItem) {
                        //  is this the same cartItem i want to add? 
    return cartItems.map((cartItem) => cartItem.id == productToAdd.id ?
    // if it is return a new cartItem, with a new object that spreads through the old properties of that cartItem expect now were adding 1 to the quantity
      {...cartItem, quantity: cartItem.quantity + 1}

      // if it doesnt match meaning that its a cart item that is not related to our product to add then just return the cartItem
      : cartItem 
    )
  }

  // return new array with modified cartItems/ new cart item
  return [...cartItems, {...productToAdd, quantity: 1}]

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)


    // we pass useEffect a callback and the callback runs evertime something dependency array changes "[cartItems]" so everytime the cartItems array changes in anyway we need to recalcualte the cart Count
    useEffect (() => {

      // reduce is going to take two arguements the first argument is the callback the second argument is the starting value 

      // We we want in the callback is first going t o be the current total then the second value is going to be the current item 
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 )
      setCartCount(newCartCount)
    }, [cartItems])
    

    
    
    // we are calling the 
    const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd));
    }
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount} 
    
    return (
      <CartContext.Provider value={value}>{children}</CartContext.Provider> 
    )
}