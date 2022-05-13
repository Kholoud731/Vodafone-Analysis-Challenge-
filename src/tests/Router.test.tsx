import * as ReactDOM from 'react-dom';
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import Home from '../components/Home';
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';
import ShowMonth from '../components/ShowMonth';

test('landing on Home page', () => {
    const history = createMemoryHistory()
    history.push('/')
    let container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <Provider store={store}>
    <Router location={history.location} navigator={history}>
      <Home/>
    </Router>
      </Provider>
,container)

  expect(container).toHaveTextContent("Analysis Chart")
})

test('landing on the other url', () => {
    const history = createMemoryHistory()
    history.push('/show/Nov')
    let container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
        <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ShowMonth/>
        </Router>
          </Provider>
,container)

expect(container).toHaveTextContent("Data")
})

