import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsernameApi} from "./api/TodoApiService"
import {useAuth} from "./security/AuthContext"
import { useNavigate } from "react-router-dom"



function ListTodosComponent() {

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    const today = new Date()
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null)


    // useEffect - to tell React that your component needs to do something after render
    useEffect ( () => refreshTodos(), [] )
    

    function refreshTodos() {

            retrieveAllTodosForUsernameApi(username)
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(username, id)
        .then(
            //1. display a message
            () => {
                setMessage(`Delete of todo with id =  ${id}, is successful. `)
                refreshTodos()}

            //2. update the list of todos
        )
        .catch(error => console.log(error))
    }


    function updateTodo(id){
       console.log('clicked' + id)
       navigate(`/todo/${id}`)  
    }

    function addNewTodo(){
        navigate(`/todo/-1`)  
     }


    return (
        <div className="container" >
            <h1>Things You Want to Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toDateString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                        <td> <button className="btn btn-warning" 
                                                        onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td> <button className="btn btn-success" 
                                                        onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )

                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )

}

export default ListTodosComponent

