import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  // getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase.config';
import axios from 'axios';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<User>;
  logIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signUp: async () => {
    throw new Error('Not implemented');
  },
  logIn: async () => {
    throw new Error('Not implemented');
  },
  signInWithGoogle: async () => {
    throw new Error('Not implemented');
  },
  logOut: async () => {
    throw new Error('Not implemented');
  },
  loading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const saveUserToDatabase = async (user: any) => {
    try {
      await axios.post('/api/user', {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      });
    } catch (error) {
      console.error('Error saving user to database:', error);
      throw error;
    }
  };
  // Email & Password sign up
  async function signUp(email: string, password: string): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await saveUserToDatabase(result.user);
      return result.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  // Email & Password login
  async function logIn(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToDatabase(result.user);
      return result.user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Use signInWithPopup instead of signInWithRedirect
      const result = await signInWithPopup(auth, provider);
      await saveUserToDatabase(result.user);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // const signInWithGoogle = async (): Promise<void> => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     // const result = await signInWithPopup(auth, provider);
  //     // return result.user;
  //     await signInWithRedirect(auth, provider);
  //     console.log('sign in with google implemented');
  //   } catch (error) {
  //     console.error('Error signing in with Google:', error);
  //     throw error;
  //   }
  // };

  const logOut = async (): Promise<void> => {
    return signOut(auth);
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   // Handle redirect result when the component mounts
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result?.user) {
  //         console.log('Successfully signed in with Google redirect');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error processing redirect result:', error);
  //     });

  //   // Set up auth state change listener
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    // Set up auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    loading,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
