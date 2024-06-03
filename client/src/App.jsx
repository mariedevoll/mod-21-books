import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <Navbar />
        <Routes>
          <Route path='/' element={<SearchBooks />} />
          <Route path='/saved' element={<SavedBooks />} />
          <Route path='*' element={<h1 className='display-2'>Wrong Page!</h1>} />
        </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
