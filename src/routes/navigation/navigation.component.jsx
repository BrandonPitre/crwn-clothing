import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"

import { ReactComponent as CrwnLogo } from '../../assets/crown (1).svg'
import { signOutUser } from "../../utils/firebase/firebase.utils"

import './navigation.style.scss'

const Navigation = () => {

  // Need the currentUser because based on this value it determines if it displays the sign in link or sign out link
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)


    return (
      <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo  className="logo" />
                        </Link>
                        <div className="nav-links-container">
                          <Link className="nav-link" to="/shop"> Shop </Link>

                         <Link className="nav-link" to="/contact"> Contact </Link>
                         {/* What this is doing is saying when there is a current user then what i want you to render is a different link  */}

                          
                          {
                            currentUser ? (
                              <span className="nav-link" onClick={signOutUser}> Sign Out </span>
                            ) 
                            // If the current user does not exist we will render our sign in link
                            :  (
                              <Link className="nav-link" to="/auth"> Sign In </Link>

                            )
                          }

                          <CartIcon />
                        </div>

                        {/* the && is known as the short circut operator.. it evaluates the truthness of the statement, so both the left and right side of the argument need to both be true */}
                        {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
      </Fragment>
    )
  }

  export default Navigation