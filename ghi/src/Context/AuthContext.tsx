import { createContext, useState } from "react";
import React from "react";

export interface AuthContextType {
    signUpError: string[],
    setSignUpError: React.Dispatch<React.SetStateAction<string[]>>,
    loginError: string,
    setLoginError: React.Dispatch<React.SetStateAction<string>>,
    getToken: () => Promise<any>,
    getUsers: () => Promise<void>,
    users: Account[],
    token: Token | null,
    setToken: React.Dispatch<React.SetStateAction<null | Token>>,
    signUpCred: SignUpCred,
    setSignUpCred: React.Dispatch<React.SetStateAction<SignUpCred>>,
    updateCred: {
        email: string;
        username: string;
        password: string;
        unhashed_password: string;
        collection: never[];
        wishlist: never[];
        roles: never[];
        created_on: {};
    },
    setUpdateCred: React.Dispatch<React.SetStateAction<{
        email: string;
        username: string;
        password: string;
        unhashed_password: string;
        collection: never[];
        wishlist: never[];
        roles: never[];
        created_on: {};
    }>>,
    update: (event: Event) => Promise<void>,
    updateWithOutPass: (event: Event) => Promise<void>,
    passwordCon: string,
    setPasswordCon: React.Dispatch<React.SetStateAction<string>>,
    loginCred: {
        username: string;
        password: string;
    },
    setLoginCred: React.Dispatch<React.SetStateAction<{
        username: string;
        password: string;
    }>>,
    signUpCredCheck: (signUpCred: SignUpCred) => Promise<string[]>,
    signup: (event: Event) => Promise<void>,
    login: () => Promise<any>,
    logout: () => Promise<void>,
    getAccountData: () => Promise<void>,
    account: Account,
}

const AuthContext = createContext<AuthContextType | null>(null);

export interface Token {
    access_token: string,
    token_type: string,
    account: {
        email: string,
        username: string,
        password: string,
        unhashed_password: string,
        profile_picture: string,
        collection: string[],
        wishlist: string[],
        recomendations: string[],
        games_played: string[],
        friends: string[],
        availability: {},
        preferences: {},
        socials: string[],
        created_on: {},
        id: string,
    }
}

interface SignUpCred {
    email: string,
    username: string,
    password: string,
    collection: [],
    wishlist: [],
    roles: [],
    created_on: {},
    }

interface Account {
    email: string,
    username: string,
    password: string,
    unhashed_password: string,
    profile_picture: string,
    collection: string[],
    wishlist: string[],
    recomendations: string[],
    games_played: string[],
    friends: string[],
    availability: {},
    preferences: {},
    socials: string[],
    created_on: {},
    id: string,
}

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginError, setLoginError] = useState("")
    const [signUpError, setSignUpError] = useState<string[]>([])
    const [account, setAccount] = useState<Account>({
        email: "",
        username: "",
        password: "",
        unhashed_password: "",
        profile_picture: "",
        collection: [],
        wishlist: [],
        recomendations: [],
        games_played: [],
        friends: [],
        availability: {},
        preferences: {},
        socials: [],
        created_on: {},
        id: "",
    })
    const [token, setToken] = useState<Token | null>(null);
    const [users, setUsers] = useState<Account[]>([])
    const [loginCred, setLoginCred] = useState({
        username: "",
        password: "",
        })
    const [signUpCred, setSignUpCred] = useState<SignUpCred>({
        email: "",
        username: "",
        password: "",
        collection: [],
        wishlist: [],
        roles: [],
        created_on: {},
        })
    const [updateCred, setUpdateCred] = useState({
        email: "",
        username: "",
        password: "",
        unhashed_password: "",
        collection: [],
        wishlist: [],
        roles: [],
        created_on: {},
        })
    const [passwordCon, setPasswordCon] = useState("")

    const getToken = async () => {
        return fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/token/`, {
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => data?.access_token ?? null)
        .catch(console.error);
    };

    const signup = async (event: Event) => {
        const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts/`
        console.log(signUpCred)
        fetch(url, {
            method: "post",
            body: JSON.stringify(signUpCred),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(() => login())
        .catch(console.error);
    };

    const update = async (event: Event) => {
        const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts/${account.id}`
        fetch(url, {
            method: "put",
            body: JSON.stringify(updateCred),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(() => getAccountData())
        .catch(console.error);
    };

    const updateWithOutPass = async (event: Event) => {
        const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts/${account.id}/without`
        console.log(url)
        console.log(updateCred)
        fetch(url, {
            method: "put",
            body: JSON.stringify(updateCred),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(() => getAccountData())
        .catch(console.error);
    };

    const login = async () => {
        try {
            const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/token`;
            const form = new FormData();
            form.append("username", loginCred.username);
            form.append("password", loginCred.password);
            const response = await fetch(url, {
                method: "post",
                credentials: "include",
                body: form,
            });
            if (response.ok) {
                const token = await getToken();
                if (token) {
                    setToken(token);
                    setLoginError("");
                    getAccountData();
                    return token;
                } else {
                    throw new Error("Failed to get token after login.");
                }
            } else {
                setLoginError("Incorrect Username/Password");
                throw new Error("Login failed.");
            }
        } catch (error) {
          throw error; // Re-throw the error for handling in the calling function.
        }
    };

    const logout = async () => {
        if (account) {
            const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/token`;
            fetch(url, { method: "delete", credentials: "include" })
                .then(() => {
                setToken(null);
                // Delete old token
                console.log("logged out")
                document.cookie =
                "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                })
                .catch(console.error);
        }
        window.location.href = `${process.env.PUBLIC_URL}/`
    };

    const getAccountData = async () => {
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/token/`,
        {credentials: "include"})
        const data = await response.json()
        setAccount(data.account)
        console.log(account)
    };

    const getUsers = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts/`);
        const data = await response.json();
        setUsers(data)
    }

    const signUpCredCheck = async(signUpCred: SignUpCred) => {
        const check:string[] = []
        const specialChar = ["!","@","$","&","+","~"]
        if (users.some(account => account.username === signUpCred.username)) {
            check.push("An account with this username already exists")
        }
        console.log("1, ",check)
        if (users.some(account => account.email === signUpCred.email)) {
            check.push("An account with this email already exists")
        }
        console.log("2, ",check)
        const password = signUpCred.password
        const checkSpec = password.split('').filter(char => specialChar.includes(char))
        if (checkSpec.length === 0) {
            check.push("Password must contain at least 1 special character (!, $, &, + or ~)")
        }
        console.log("3, ",check)
        const checkUpper = password.split('').filter(char => /[A-Z]/.test(char))
        if (checkUpper.length === 0) {
            check.push("Password must contain atleast 1 Uppercase letter")
        }
        console.log("4, ",check)
        const checkLower = password.split('').filter(char => /[a-z]/.test(char))
        if (checkLower.length === 0) {
            check.push("Password must contain atleast 1 Lowercase letter")
        }
        console.log("5, ",check)
        if (password !== passwordCon) {
            check.push("Passwords must match")
        }
        if (check.length > 0) {
            setSignUpError(check)
            return check
        }
        return check
    }

    return (
        <AuthContext.Provider value={{
            signUpError,
            setSignUpError,
            loginError,
            setLoginError,
            getToken,
            getUsers,
            users,
            token,
            setToken,
            signUpCred,
            setSignUpCred,
            updateCred,
            setUpdateCred,
            update,
            updateWithOutPass,
            passwordCon,
            setPasswordCon,
            loginCred,
            setLoginCred,
            signUpCredCheck,
            signup,
            login,
            logout,
            getAccountData,
            account,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
