/* eslint-disable prettier/prettier */
import React from 'react';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducers from './src/store/reducers';


const createStoreWithMiddleware =  applyMiddleware(promiseMiddleware)(createStore);

// const store = createStore(rootReducers, composeWithDevTools(
//   applyMiddleware(promiseMiddleware),
//   // other store enhancers if any
// ));

export default class App extends React.Component {


  render() {
    return (
      <Provider store = {createStoreWithMiddleware(rootReducers)}>
      <AppNavigator
      />
      </Provider>
    );
  }
}
