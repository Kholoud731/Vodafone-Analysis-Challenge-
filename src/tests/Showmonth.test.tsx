import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';
import {render , screen, } from "@testing-library/react"
import ShowMonth from '../components/ShowMonth';

it('renders without crashing', () => {
  const history = createMemoryHistory()
  history.push('/show/Nov')

  render(
    <Provider store={store}>
    <Router location={history.location} navigator={history}>
    <ShowMonth/>

    </Router>
    </Provider>
    );
    expect(screen.getByText(/Data for the selected points/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to Home Page/i)).toBeInTheDocument();
});

