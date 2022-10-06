import { User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FC, createContext, useEffect, useState, useContext } from 'react';
import firebaseApp from './firebaseConfig';

type AuthContextProps = {
  currentUser: User | null | undefined;
};
type Props = {
  children?: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: FC<Props> = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };