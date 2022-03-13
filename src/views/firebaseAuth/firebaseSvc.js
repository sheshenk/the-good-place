import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseDetails';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);
const auth = getAuth();

/**
 * Class which operates as a database object, whose functions are
 * called for any and all CRUD operations. Backend logic is present
 * here as well, through the matching functions.
 */

class FirebaseSvc {
  constructor() {
    
  }

  // AUTHENTICATION

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
    signOut(auth)
    .then(success)
    .catch(failure);
  };

  /**
   * For registration of new users
   * @param {*} user User object containing all parameters of user
   * @param {*} success 
   * @param {*} failure 
   */
  createUser = async(user, success, failure) => {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(success)
    .catch(failure);// If create user with email and pw fails
  }
  
  /**
   * 
   */
  isUserSignedIn = async() => {
    const user = auth.currentUser;
    if (user) {// user is not a boolean so we can't just return user
      return true;
    } else {
      return false;
    }
  }
  
  /**
   * For Adding DisplayName of the User in Auth Table
   * @param {*} user 
   * @param {*} success 
   * @param {*} failure 
   */
  addUserName = async(name, success, failure) => {
    await updateProfile(auth.currentUser,
    {
      displayName: name
    })
    .then(success)
    .catch(failure);// If adding the name doesn't work
  }

  // DB OPERATIONS

  addUserToDb = async(user)  => {
    const userRef = this.userRef(auth.currentUser.uid);
    set(userRef, user);
  }

  // DB REFERENCES

  /**
   * Get the reference to user object within the users object within the database
   * @param {*} params id of object
   * @returns reference
   */
   userRef(params) {
    return ref(db, `Users/${params}`);
  }
  
  /**
   * Get the reference to certificate object within the certificates object within the database
   * @param {*} params id of object
   * @returns reference
   */
   certificateRef(params) {
    return ref(db, `Certificates/${params}`);
  }

  getAllCertificatesFromDb() {
    return this.certificateRef();
  }

  certsRefOff() {
    return this.certificateRef().off()
  }


}

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
// firebase.auth().languageCode = 'de';

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;