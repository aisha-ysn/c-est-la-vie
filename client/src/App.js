import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar'
import Entries from './pages/listEntry';
import Form from './pages/addEntry'
import Home from './pages/Home'
// import Index from './pages/index'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Auth from './utils/auth';
const httpLink = new createHttpLink({
  uri: "http://localhost:3001/graphql"
})

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

function RequireAuth({ children }) {

  let location = useLocation();

  if (!Auth.loggedIn()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <RequireAuth>
                <Entries />
              </RequireAuth>
            } />
            <Route path="/journal" element={
              <RequireAuth>
                <Form />
              </RequireAuth>
            } />

            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App