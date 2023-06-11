import { Outlet, Link } from "react-router-dom"
import { Fragment, useContext } from "react"
import './navigation.style.scss'

import { ReactComponent as CrwnLogo } from '../../assets/crown (1).svg'
import { UserContext } from "../../contexts/user.context"

import { signOutUser } from "../../utils/firebase/firebase.utils"

const Navigation = () => {

  // Need the currentUser because based on this value it determines if it displays the sign in link or sign out link
    const { currentUser } = useContext(UserContext)

    return (
      <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo  className="logo" />
                        </Link>
                        <div className="nav-links-container">
                          <Link className="nav-link" to="/shop"> Shop </Link>

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

                          <Link className="nav-link" to="/contact"> Contact </Link>
                        </div>

            </div>
            <Outlet />
      </Fragment>
    )
  }

  export default Navigation