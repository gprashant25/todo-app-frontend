
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'



function WelcomeComponent() {

    const { username } = useParams()    // here used the useParam() hook  to retrieve the username dynamically from the url

    const [message, setMessage] = useState(null)

    const authContext = useAuth()

    function callHelloWorldRestApi() {

        console.log('called')

        // using axios framework to call the REST API directly from the Frontend React component
        // axios.get('http://localhost:8080/hello-world')
        //     .then((response) => successfulResponse(response))
        //     .catch((error) => errorResponse(error))
        //     .finally(() => console.log('cleanup'))

        retrieveHelloWorldPathVariable('Prashant', authContext.token)
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'))

    }

    function successfulResponse(response) {
        console.log(response)
        // setMessage(response.data)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Your Todos - <Link to="/todos">Click here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World </button>
            </div>
            <div className="text-info">{message}</div>
        </div >
    )
}

export default WelcomeComponent