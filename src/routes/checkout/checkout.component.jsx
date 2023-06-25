import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'


import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const CheckOut = () => {

    //  we imported the Cart Context from the CartContext folder, from there we want to "destructure" the cartItems from that 'context' which means that we want that value...
     const { cartItems } = useContext(CartContext)


    return  (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>



 
                {
                cartItems.map((cartItem) => (
                            <CheckoutItem key={cartItem.id} cartItem={cartItem
                            } />
                        ))}
                    <span className='total'>Total: 0</span>
                </div>
    )
}


export default CheckOut