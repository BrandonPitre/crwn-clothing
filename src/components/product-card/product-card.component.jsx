import Button from '../button/button.component'
import './product-card.styles.scss'


//({ product })  product is the value that you passing in
// ({ product }) is going to be the actual product data from the  shop-data.json file
//  we are going to assume that these are the same value that we are going to get inside our product card
const ProductCard = ({ product }) => {
// Once you get the product, we are going to destructure the product, meaning that these are the values that we want to get from product
     const { name, price, imageUrl} = product;
    
   

        {/* images need an alt text, for screen readers */}
        return (<div className='product-card-container'>
            <img src={imageUrl}  alt={`${name}`}/>
            <div className='footer'>
            {/* inside of the 'name' span we are going to call {name} from product value */}
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
        </div>
        <Button buttonType='inverted'>Add To Cart</Button>
    </div>)
}

export default ProductCard