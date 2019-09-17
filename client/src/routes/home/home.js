import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'


function Home () {
  const { loading, error, data } = useQuery(
    gql`
      query getList {
        getNotTodos {
          name
          description
        }
      }
    `)


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function onChange (event) {
      if (event.target.name === 'name') {
        setName(event.target.value)
      } else {
        setDescription(event.target.value)
      }
    }

    let [createNotTodo] = useMutation(gql`
        mutation CreateNotTodo($name: String, $description: String) {
            createNotTodo(name: $name, description: $description) {
                name
                description
            }
        }
    `)

  function save () {
    createNotTodo({variables: {name, description}, refetchQueries: ["getList"]})
    setName('')
    setDescription('')
  }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h3 style={{margin: '0px'}}>Add something to not do!</h3>
        <input placeholder='Name' name='name' onChange={onChange} value={name} />
        <input placeholder='Description' name='description' onChange={onChange} value={description}/>
        <button onClick={save}>Save</button>
      </div>
      <table style={{border: '1px solid black'}}>
        <tr>
          <th style={{border: '1px solid black'}}>name</th>
          <th style={{border: '1px solid black'}}>description</th>
        </tr>
        {
          data.getNotTodos.map(notTodo => (
            <tr>
              <td style={{border: '1px solid black'}}>{notTodo.name}</td>
              <td style={{border: '1px solid black'}}>{notTodo.description}</td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}


export default Home
