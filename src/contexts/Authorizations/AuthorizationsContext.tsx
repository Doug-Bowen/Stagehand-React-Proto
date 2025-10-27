import { createContext, FC, ReactNode } from 'react';

export const AuthorizationsContext = createContext({});

interface AuthorizationsProviderProps {
    children?: ReactNode;
}

const AuthorizationsProvider: FC<AuthorizationsProviderProps> = ({ children }) => {
    return <AuthorizationsContext.Provider value={{}}>{ children }</AuthorizationsContext.Provider>
}

export default AuthorizationsProvider;
