import { useContext, createContext, type PropsWithChildren } from 'react';
import { setStorageItemAsync, useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    setSession(Math.random().toString(20).substr(2, 6));
                },
                signOut: () => {
                    setSession(null);
                    setStorageItemAsync('user-email', null);
                    setStorageItemAsync('user-first-name', null);
                    setStorageItemAsync('user-last-name', null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
