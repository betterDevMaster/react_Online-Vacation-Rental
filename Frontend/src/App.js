import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>

      // ,document.querySelector(".container")
    );
  }
}

export default App;
