import { createContext, useState, useEffect} from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,

});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser ] = useState(null)
    const value = { currentUser, setCurrentUser }


    useEffect(() => {

        // The user that gets passed through is either going to be a authenticated user object or null... You get null when the user signs out 
        const unsubscribe = onAuthStateChangedListener((user) => {
            
            // if there is a user that comes in then i want to create a user document from auth, otherwise just set the current user
            if (user) {
                createUserDocumentFromAuth(user)
            }

            // Call the setter and pass in whatever that auth changed value will be
            setCurrentUser(user);
        })
        
        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

