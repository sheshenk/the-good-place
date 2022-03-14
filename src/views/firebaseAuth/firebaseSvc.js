import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseDetails.js';
import { getDatabase, ref, set, update, onValue, get, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { prefList, skillList } from "../utilities/Constants.js";

const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);
const auth = getAuth();



export const useAuthListener = () => {
  // assume user to be logged out
  const [loggedIn, setLoggedIn] = useState(true);

  // keep track to display a spinner while auth status is being checked
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // auth listener to keep track of user signing in and out
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user == null) {
        setLoggedIn(false);
      }
      setCheckingStatus(false);
      return () => unsubscribe()
    });
  }, [loggedIn, checkingStatus]);
  return { loggedIn, checkingStatus };
};

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

  currentUser = () => {
    if (!auth.currentUser) {
      return {};
    } else {
      const uid = auth.currentUser.uid;
      const user = get(this.userRef(uid)).then(snapshot => snapshot.val()).catch(console.error);
      return user;
    }
  }

  addUserToDb = async(user, success, failure)  => {
    const userRef = this.userRef(auth.currentUser.uid);
    set(userRef, user)
    .then(success)
    .catch(failure);
  }

  getUserFromDb = async() => {
    const userRef = this.userRef(auth.currentUser.uid);
    const user = await onValue(userRef, (snapshot) => snapshot.val(), {onlyOnce: true});
    return user;
  }

  updateUserScoreToDb = async(score) => {
    const userRef = this.userRef(auth.currentUser.uid);
    const updates = {};
    updates['/Users/' + auth.currentUser.uid + '/score/'] = score;
    return update(userRef, updates);
  }

  updateUserProject = async(proj) => {
    const userRef = this.userRef(auth.currentUser.uid);
    const updates = {};
    updates['/project/'] = proj;
    return update(userRef, updates);
  }

  allProjectsFromDb = async(callback) => {
    const projectRef = this.projectRef('');
    return onValue(projectRef, callback);
  }

  allStoriesFromDb = async(callback) => {
    const storiesRef = this.storiesRef('');
    return onValue(storiesRef, callback);
  }

  userProjectFromDb = async() => {
    const userRef = this.userRef(auth.currentUser.uid);
    const projectId = await onValue(userRef, (snapshot) => snapshot.val().project, {onlyOnce: true});
    const projectRef = this.projectRef(projectId);
    return onValue(projectRef, (snapshot) => snapshot.val());
  }

  matchProjectCurrentUser = (user) => {
    const success = async (snapshot) => {
      let projs = snapshot.val();
      let maxScore = 0;
      let maxScoreKey = -1;
      for (const [key, value] of Object.entries(projs)) {
        console.log(user);
        const comparisonValue = await this.compareProjectWithUser(value, user);
        if (maxScore < comparisonValue) {
          maxScore = comparisonValue;
          maxScoreKey = key;
        }
      }
      this.updateUserProject(maxScoreKey);
    }
    this.allProjectsFromDb(success);
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

  getUserName() {
    const user = auth.currentUser
    if (user) {
      return user.displayName
    } else {
      return ''
    }
  }
  
  getHours = async (callback) => {
    const user = auth.currentUser
    if (user) {
      const userRef = this.userRef(`${user.uid}/hours`)
      return onValue(userRef, callback)
    }
    return false
  }

  /**
   * Get the reference to certificate object within the certificates object within the database
   * @param {*} params id of object
   * @returns reference
   */
   certificateRef(params) {
    return ref(db, `Certificates/${params}`);
  }

  getAllCertificatesFromDb = async(callback) => {
    const certRef = this.certificateRef('');
    return onValue(certRef, callback)
  }

  certsRefOff() {
    return this.certificateRef().off()
  }

  /**
   * Get the reference to project object within the projects object within the database
   * @param {*} params id of object
   * @returns reference
   */
   projectRef(params) {
    return ref(db, `Projects/${params}`);
  }

  storiesRef(params) {
    return ref(db, `Stories/${params}`);
  }

  addStoryToDb(data) {
    const storyRef = this.storiesRef('')
    push(storyRef, data)
  }

  // HELPERS
  compareProjectWithUser = async (project, user) => {
    let score = 0;
    score = await user.then((userVal) => {
      skillList.forEach((skill) => {
        if (skill in userVal && skill in project) {
          score++;
        }
      });
      prefList.forEach((pref) => {
        if (pref in userVal && pref in project) {
          score++;
        }
      });
      return score;
    }).catch(console.error);
    return score;
  }
}

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();
// firebase.auth().languageCode = 'de';

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;