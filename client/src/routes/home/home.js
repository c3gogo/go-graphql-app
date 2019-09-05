import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'



function Home () {
    const { loading, error, data } = useQuery(gql`{
            getNotTodos {
                name
                description
            }
        }
    `)

    let [createNotTodo] = useMutation(gql`
        mutation CreateNotTodo($name: String, $description: String) {
            createNotTodo(name: $name, description: $description) {
                name
                description
            }
        }
    `)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data)
    return data.getNotTodos.map(elem => <h1 key={elem.name}>{elem.name}</h1>)   
}


export default Home