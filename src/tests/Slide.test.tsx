import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';
import {render , screen, } from "@testing-library/react"
import Slide from '../components/Slide';

it('renders without crashing', () => {
  const history = createMemoryHistory()
  history.push('/')

  render(
    <Provider store={store}>
    <Router location={history.location} navigator={history}>
    <Slide/>

    </Router>
    </Provider>
    );
    expect(screen.getByText(/lessons/i)).toBeInTheDocument();
});

