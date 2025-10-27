import { createContext, FC, ReactNode } from 'react';

export const AuthenticationContext = createContext({});

interface AuthenticationProviderProps {
    children?: ReactNode;
}

const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ children }) => {
    return <AuthenticationContext.Provider value={{}}>{ children }</AuthenticationContext.Provider>
}

export default AuthenticationProvider;
