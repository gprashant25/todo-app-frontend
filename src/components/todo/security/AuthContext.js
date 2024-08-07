import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

// code below: SHARING a STATE with Multiple components 

//1. Create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2. share the created context with other components; we created a function component AuthProvider
export default function AuthProvider({ children }) {


    //3. Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)



    // function login(username, password){
    //     if (username === 'in28minutes' && password === 'dummy') {
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }
    //     else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //        return false
    //     }
    // }

    // below is using the Basic authorization 
    // async function login(username, password) {

    //     const batoken = 'Basic ' + window.btoa(username + ":" + password)

    //     try {

    //         const response = await executeBasicAuthenticationService(batoken)


    //         if (response.status == 200) {
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(batoken)
                
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization=batoken
    //                     return config
    //                 }
    //             )

    //             return true
    //         }
    //         else {
    //             logout()
    //             return false
    //         }

    //     }catch(error){
    //        logout()
    //         return false
    //     }

    // }


    // below is using the JWT authorization 
    async function login(username, password) {


        try {

            const response = await executeJwtAuthenticationService(username, password)


            if (response.status == 200) {

                const jwtToken = 'Bearer ' + response.data.token

                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)
                
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            }
            else {
                logout()
                return false
            }

        }catch(error){
           logout()
            return false
        }

    }


    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )

}