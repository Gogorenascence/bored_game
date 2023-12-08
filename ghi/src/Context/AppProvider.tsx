import React from "react";
import { AuthContextProvider } from "./AuthContext";

const AppProvider = ({children}) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}

export default AppProvider