import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredenctial {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredenctial): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const keys = ['@GoBarber:token', '@GoBarber:user'];

      const [token, user] = await AsyncStorage.multiGet(keys);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    const multiSetData = [
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ];

    await AsyncStorage.multiSet(multiSetData);

    setData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(async () => {
    const keys = ['@GoBarber:token', '@GoBarber:user'];

    await AsyncStorage.multiRemove(keys);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{user: data.user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth custom Hook
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
