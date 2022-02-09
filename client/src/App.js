import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar'
import Entries from './pages/Entries';
import Form from './pages/Journal'
const httpLink = new createHttpLink({
  uri:"/graphql"})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (<ApolloProvider client = {client}>
    <Router>
      <>
        <Navbar />
        <Switch>

          <Route exact path="/" component = {Entries} />
         
          <Route exact path="/journals" component ={Form}/>
          
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}
  

//   // Removes Entry
//   removeEntry = index => {
//     const { entries } = this.state

//     this.setState({
//       entries: entries.filter((entry, i) => {
//         return i != index
//       })
//     })
//   }

// // Journal is shown under entries when submitted
//   handleSubmit = entry => {
//     this.setState({ entries: [...this.state.entries, entry] })
//   }

//   render() {
//     const { entries } = this.state;

//     return (
//       <div className="App">
//         <Form handleSubmit={this.handleSubmit} />
//         <Entries entryData={entries} removeEntry={this.removeEntry} />
//       </div>
//     );
//   }

// }

export default App;
