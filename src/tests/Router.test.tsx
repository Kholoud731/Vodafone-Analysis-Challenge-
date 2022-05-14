import * as ReactDOM from 'react-dom';
import {createMemoryHistory} from 'history'
import {render , screen, } from "@testing-library/react"
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import Home from '../components/Home';
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';
import ShowMonth from '../components/ShowMonth';

test('landing on Home page', () => {
    const history = createMemoryHistory()
    history.push('/')
    render(
      <Provider store={store}>
    <Router location={history.location} navigator={history}>
      <Home/>
    </Router>
      </Provider>)
  expect(screen.getByText(/Analysis Chart/i)).toBeInTheDocument();

})

test('landing on the other url', () => {
    const history = createMemoryHistory()
    history.push('/show/Nov')
    render(
        <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ShowMonth/>
        </Router>
          </Provider>)
expect(screen.getByText(/Data/i)).toBeInTheDocument();

})

