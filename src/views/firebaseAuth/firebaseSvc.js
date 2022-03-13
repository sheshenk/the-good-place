import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseDetails';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);

const auth = getAuth();
console.log(auth);

/**
 * Class which operates as a database object, whose functions are
 * called for any and all CRUD operations. Backend logic is present
 * here as well, through the matching functions.
 * TODO: Migrate these operations to a separate backend repository
 */

class FirebaseSvc {
  constructor() {
    
  }

  /**
   * Login to user account
   * @param {*} user User object containing all parameters of user
   * @param {*} success_callback 
   * @param {*} failed_callback Print error if failure occurs
   */
  login = async(user, success_callback, failed_callback) => {
      await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(success_callback)
      .catch(failed_callback);
    }

  /**
   * Sign out of user account
   * @param {*} success Sign out of account
   * @param {*} failure Print error if failure occurs
   */
  signOut = (success, failure) => {
    firebase
    .auth()
    .signOut()
    .then(success)
    .catch(failure)
  };

  /**
   * For registration of new users
   * @param {*} user User object containing all parameters of user
   * @param {*} success 
   * @param {*} failure 
   */
  createUser = async(user, success, failure) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async () => await updateProfile(auth.currentUser,
                      {
                        displayName: user.name
                      })
                      .then(success)
                      .catch(failure)// If adding the name doesn't work
    )
    .catch(failure);// If create user with email and pw fails    

    
  }
}

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
// firebase.auth().languageCode = 'de';

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;