import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Loading from "../../components/Loading/Loading";
import * as React from "react";
interface providerProps {
  children: React.ReactNode;
}
interface contextProps {
  authenticated?: boolean;
  user?: any;
  signIn: (
    email: string,
    password: string,
    callbackSuccess?: () => void,
    callbackError?: () => void
  ) => void;
  signOutUser: (callback: any) => void;
  signUp: (
    email: string,
    password: string,
    callbackSuccess?: () => void,
    callbackError?: () => void
  ) => void;
}

const intialState: contextProps = {
  signIn: (email: string, password: string) =>
    Promise.reject("Failed to login"),
  signOutUser: () => Promise.reject("Failed to logout"),
  signUp: () => Promise.reject("failed to signup"),
};
const AuthContext = React.createContext(intialState);
interface providerState {
  user: any;
  authenticated: boolean;
}

const AuthProvider: React.FC<providerProps> = ({ children }) => {
  const [initialAuthState, setInitialState] = React.useState<providerState>({
    user: null,
    authenticated: false,
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const intialize = async () => {
      setLoading(true);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setInitialState({
            user: user,
            authenticated: true,
          });
          setLoading(false);
        } else {
          setInitialState({
            user: null,
            authenticated: false,
          });
          setLoading(false);
        }
      });
    };
    intialize();
  }, []);
  function signIn(
    email: string,
    password: string,
    callbackSuccess: any,
    callbackError: any
  ) {
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setInitialState({
          ...initialAuthState,
          user: data,
          authenticated: true,
        });

        callbackSuccess();
      })
      .catch((error) => {
        alert(error.message);
        callbackError();
      });
  }
  async function signUp(
    email: string,
    password: string,
    callbackSuccess?: any,
    callbackError?: any
  ) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setInitialState({
          ...initialAuthState,
          user: data,
          authenticated: true,
        });
        if (typeof email === "string") {
          setDoc(doc(db, "users", email), {
            savedShows: [],
          }).then(() => {
            callbackSuccess();
          });
        } else {
          signOutUser();
          callbackError();
          alert("some error occured while creating an account for u");
        }
      })
      .catch((error) => {
        alert(error.message);
        callbackError();
      });
  }
  function signOutUser(callback?: any) {
    return signOut(auth)
      .then(() => {
        setInitialState({
          user: null,
          authenticated: false,
        });
        callback();
      })
      .catch(() => {
        alert("failed to signout please try again later");
        callback();
      });
  }
  return (
    <AuthContext.Provider
      value={{ ...initialAuthState, signIn, signOutUser, signUp }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthProvider;
