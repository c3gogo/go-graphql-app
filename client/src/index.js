import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import AppRouter from './routes'

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

ReactDOM.render(<ApolloProvider client={client}>
        <AppRouter />
    </ApolloProvider>, document.getElementById('app'))