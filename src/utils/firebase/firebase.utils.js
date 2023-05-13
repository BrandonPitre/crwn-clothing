import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    
} from 'firebase/auth'

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA288tB0TkqyeN_czMTKL6TkgvUZwZLf1g",
    authDomain: "crwn-clothing2-db-6fe79.firebaseapp.com",
    projectId: "crwn-clothing2-db-6fe79",
    storageBucket: "crwn-clothing2-db-6fe79.appspot.com",
    messagingSenderId: "577440687403",
    appId: "1:577440687403:web:2ef38e38b8d304daced16e"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, provider );

export const db = getFirestore()


export const createUserDocumentFromAuth = async (userAuth) => { const userDocRef = doc(db, 'users', userAuth.uid);

console.log(userDocRef)

const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists());


    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date();

        try { 
            await  setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    
    return userDocRef;
}
