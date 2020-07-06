import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './layout/Layout';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
