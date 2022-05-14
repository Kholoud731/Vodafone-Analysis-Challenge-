import '@testing-library/jest-dom'
import Chart from '../components/Chart';
import {render , screen, } from "@testing-library/react"
import { store } from '../store/rootStore';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'

it('renders without crashing', () => {

  const history = createMemoryHistory()
  history.push('/')
   
  render(
    <Provider store={store}>
    <Router location={history.location} navigator={history}>
      <Chart/>
    </Router>
      </Provider>
    );
  expect(screen.getByText(/No of lessons/i)).toBeInTheDocument();
});

