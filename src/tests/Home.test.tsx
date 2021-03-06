import {render , screen, } from "@testing-library/react"
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import Home from '../components/Home';
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';



test('landing on Home page', () => {
  const history = createMemoryHistory()
  history.push('/')

  render(
    <Provider store={store}>
    <Router location={history.location} navigator={history}>
      <Home/>
    </Router>
    </Provider>
)
expect(screen.getByText(/Analysis Chart/i)).toBeInTheDocument();
})

