import { createContext, useState, useEffect } from "react";

// this function will now allow us to essentially add a new product into the Cart and keep track of the quantity


const addCartItem = (cartItems, productToAdd) => {
  
  // find if cartItems contains productToAdd
const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
    )
    // if Found, increment quantity

    // This code is saying if we found a match for existingCartItem then we want to return a new array of cartItems
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

};


const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    )

    //check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1) {
                // this method is saying filter out any thing inside the brackets as false, if the statement is true keep the value 
                return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // return back cartitems with matching cart item with reduced quantity

            // So were mapping through all of the cart items and saying if the id matches the one were trying to remove give us a new object with the same cart item properties `...cartItem` and minus one 
    return cartItems.map((cartItem) => cartItem.id == cartItemToRemove.id ?
   
      {...cartItem, quantity: cartItem.quantity - 1}

      : cartItem 
    )
  }


  const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
    



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)


    // We pass useEffect a callback and the callback runs evertime something dependency array changes "[cartItems]" so everytime the cartItems array changes in anyway we need to recalcualte the cart Count
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

    const removeItemToCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    
    const clearItemFromCart = (cartItemToClear) => {
      setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount} 
    
    return (
      <CartContext.Provider value={value}>{children}</CartContext.Provider> 
    )
}