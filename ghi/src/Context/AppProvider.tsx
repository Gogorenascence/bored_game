import React, { useState } from "react";
import { AuthContextProvider, AuthContextType } from "./AuthContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}

export default AppProvider