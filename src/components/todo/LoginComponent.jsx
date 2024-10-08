
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function LoginComponent() {

    // below using React state feature : 
    //created a state variable below all variables are called as Hookes
    const [username, setUsername] = useState('in28minutes')

    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()


    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        }
        else {
            setShowErrorMessage(true)
        }
    }



    return (
        <div className="Login">
            <h1>Login Page!</h1>
            {showErrorMessage && <div className="errorMessage">Authentication failed.</div>}

            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>

        </div>
    )
}


export default LoginComponent